import React, { useEffect, useState } from "react"
import * as TaskManager from "expo-task-manager"
import * as Location from "expo-location"
import { useDispatch } from 'react-redux';

import { UserType } from '../constants/Enums';
import Variables from '../constants/Variables';
import * as GlobalFuctions from '../common/GlobalFunctions';

import * as userAction from '../store/actions/user';

export const setupLocationManager = (dispatch) => {

	const updateMinutes = 3;
	const LOCATION_TASK_NAME = "LOC_UPDATER";
	let foregroundSubscription = null;
	let isUpdating = false;
	let timeMilliSec = 1000 * 60 * updateMinutes; //3 minutes

	const defineLocationTask = () => {

		TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
			try {
				if (error) {
					console.error(error)
					return
				}
				if (data) {
					// Extract location coordinates from data
					const { locations } = data
					const location = locations[0]
					if (location) {
						const c = location.coords;
						updateLocationInDb(c);
						console.log("Location in background");
					} else {
						console.log('no loc');
					}
				}
				else {
					console.log('no data');
				}
			} catch (err) {
				console.log('error when gps off : TaskManager.defineTask');
			}
		});

	}

	const updateLocationInDb = async (cords) => {
		try {
			if (isUpdating) return;

			const hms = GlobalFuctions.getHMSTime();
			console.log(hms + ' ; ' + Variables.OfficeStartHours + ' ; ' + Variables.OfficeEndHours);

			if (hms <= Variables.OfficeStartHours || hms >= Variables.OfficeEndHours) {
				console.log('turning off location seeking beyond office hours');
				stopForegroundUpdate();
				stopBackgroundUpdate();
				return;
			}

			const currentTime = new Date();

			if (Variables.LastLocUpdateTime == undefined) {
				Variables.LastLocUpdateTime = currentTime;
			} else if ((currentTime - Variables.LastLocUpdateTime) / 1000 < (updateMinutes * 60)) {
				return;
			} else {
				Variables.LastLocUpdateTime = currentTime;
			}

			Variables.LocUpdaterRunning = true;

			const lat = cords.latitude;
			const lon = cords.longitude;
			const locDifference = 0.00001;

			if (Math.abs(Variables.LastLatitude - lat) >= locDifference || Math.abs(Variables.LastLatitude - lon) >= locDifference) {
				isUpdating = true;
				Variables.LastLatitude = lat;
				Variables.LastLongitude = lon;
				await dispatch(userAction.updateLocation(Variables.LoginUserId, cords.latitude, cords.longitude, cords.accuracy, cords.altitude, cords.altitudeAccuracy, cords.heading, cords.speed));
				isUpdating = false;
			} else {
				console.log('Location not changed significantly');
			}
		} catch (err) {
			console.log('update location error : updateLocationInDb');
			console.log(err);
		}
	}

	const startForegroundUpdate = async () => {
		try {
			// Check if foreground permission is granted
			const { granted } = await Location.getForegroundPermissionsAsync()
			if (!granted) {
				console.log("location tracking denied")
				return
			}

			// Make sure that foreground location tracking is not running
			if (foregroundSubscription) {
				return;
			}
			//foregroundSubscription?.remove()

			// Start watching position in real-time
			foregroundSubscription = await Location.watchPositionAsync(
				{
					// For better logs, we set the accuracy to the most sensitive option
					accuracy: Location.Accuracy.BestForNavigation,
					timeInterval: timeMilliSec,
					distanceInterval: 5,
					deferredUpdatesInterval: timeMilliSec
				},
				location => {
					setMyLocationCords(location.coords)
				}
			)
		} catch (err) {
			console.log('error when gps off : startForegroundUpdate');
			console.log(err);
		}
	}

	const setMyLocationCords = (c) => {
		if (Variables.LoginUserType == UserType.PDA || Variables.LoginUserType == UserType.Marketing) {
			console.log('received');
			updateLocationInDb(c);
		} else {
			console.log('stopping');
			stopForegroundUpdate();
			stopBackgroundUpdate();
		}
	}

	// Start location tracking in background
	const startBackgroundUpdate = async () => {
		try {
			// Don't track position if permission is not granted
			const { granted } = await Location.getBackgroundPermissionsAsync()
			if (!granted) {
				return;
			}

			// Make sure the task is defined otherwise do not start tracking
			const isTaskDefined = await TaskManager.isTaskDefined(LOCATION_TASK_NAME)
			if (!isTaskDefined) {
				defineLocationTask();
				//console.log("Task is not defined");
				//return;
			}

			// Don't track if it is already running in background
			const hasStarted = await Location.hasStartedLocationUpdatesAsync(
				LOCATION_TASK_NAME
			)

			if (hasStarted) {
				console.log("Already started: " + LOCATION_TASK_NAME)
				return
			}

			await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
				// For better logs, we set the accuracy to the most sensitive option
				accuracy: Location.Accuracy.BestForNavigation,
				timeInterval: timeMilliSec,
				distanceInterval: 5,
				deferredUpdatesInterval: timeMilliSec,
				// Make sure to enable this notification if you want to consistently track in the background
				showsBackgroundLocationIndicator: true,
				foregroundService: {
					notificationTitle: "Location",
					notificationBody: "Location tracking in background",
					notificationColor: "#fff",
				}
			})
		} catch (err) {
			console.log('error when gps off : startBackgroundUpdate');
			console.log(err);
		}
	}

	const stopForegroundUpdate = () => {
		console.log('stopForegroundUpdate');
		foregroundSubscription?.remove();
		Variables.LocUpdaterRunning = false;
	}

	const stopBackgroundUpdate = async () => {
		console.log('stopBackgroundUpdate');
		const hasStarted = await Location.hasStartedLocationUpdatesAsync(
			LOCATION_TASK_NAME
		)
		if (hasStarted) {
			await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME)
		}
		Variables.LocUpdaterRunning = false;
	}

	if (Variables.LocationTrackingAllowed) {
		defineLocationTask();
		startForegroundUpdate();
		startBackgroundUpdate();
	}
	else {
		stopForegroundUpdate();
		stopBackgroundUpdate();
	}

}
