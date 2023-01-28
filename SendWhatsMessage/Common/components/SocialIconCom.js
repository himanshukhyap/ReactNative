// Example of Social Icons using React Native Elements
// https://aboutreact.com/react-native-social-icon/

// Import React
import React from 'react';

// Import required component
import {SafeAreaView, StyleSheet, ScrollView, Text, View} from 'react-native';

// Import to show social icons
import {SocialIcon} from '@rneui/themed';

const SocialIconCom = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.heading}>
            Example of Social Icons using React Native Elements
          </Text>
          <Text style={styles.textStyle}>www.aboutreact.com</Text>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={{flexDirection: 'column'}}>
                <SocialIcon
                  //Social Icon using @rneui/themed
                  type="angellist"
                  //Type of Social Icon
                  onPress={() => {
                    //Action to perform onPress of the Icon
                    alert('angellist');
                  }}
                />
                <Text style={{textAlign: 'center'}}>angellist</Text>
              </View>
              <View style={{flexDirection: 'column'}}>
                <SocialIcon
                  type="codepen"
                  onPress={() => {
                    alert('codepen');
                  }}
                />
                <Text style={{textAlign: 'center'}}>codepen</Text>
              </View>
              <View style={{flexDirection: 'column'}}>
                <SocialIcon
                  type="envelope"
                  onPress={() => {
                    alert('envelope');
                  }}
                />
                <Text style={{textAlign: 'center'}}>envelope</Text>
              </View>
              <View style={{flexDirection: 'column'}}>
                <SocialIcon
                  type="etsy"
                  onPress={() => {
                    alert('etsy');
                  }}
                />
                <Text style={{textAlign: 'center'}}>etsy</Text>
              </View>
              <View style={{flexDirection: 'column'}}>
                <SocialIcon
                  type="facebook"
                  onPress={() => {
                    alert('facebook');
                  }}
                />
                <Text style={{textAlign: 'center'}}>facebook</Text>
              </View>
            </View>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={{flexDirection: 'column'}}>
                <SocialIcon
                  type="foursquare"
                  onPress={() => {
                    alert('foursquare');
                  }}
                />
                <Text style={{textAlign: 'center'}}>foursquare</Text>
              </View>
              <View style={{flexDirection: 'column'}}>
                <SocialIcon
                  type="github-alt"
                  onPress={() => {
                    alert('github');
                  }}
                />
                <Text style={{textAlign: 'center'}}>github-alt</Text>
              </View>
              <View style={{flexDirection: 'column'}}>
                <SocialIcon
                  type="github"
                  onPress={() => {
                    alert('github');
                  }}
                />
                <Text style={{textAlign: 'center'}}>github</Text>
              </View>
              <View style={{flexDirection: 'column'}}>
                <SocialIcon
                  type="gitlab"
                  onPress={() => {
                    alert('gitlab');
                  }}
                />
                <Text style={{textAlign: 'center'}}>gitlab</Text>
              </View>
              <View style={{flexDirection: 'column'}}>
                <SocialIcon
                  type="instagram"
                  onPress={() => {
                    alert('instagram');
                  }}
                />
                <Text style={{textAlign: 'center'}}>instagram</Text>
              </View>
            </View>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={{flexDirection: 'column'}}>
                <SocialIcon
                  type="linkedin"
                  onPress={() => {
                    alert('linkedin');
                  }}
                />
                <Text style={{textAlign: 'center'}}>linkedin</Text>
              </View>
              <View style={{flexDirection: 'column'}}>
                <SocialIcon
                  type="medium"
                  onPress={() => {
                    alert('medium');
                  }}
                />
                <Text style={{textAlign: 'center'}}>medium</Text>
              </View>
              <View style={{flexDirection: 'column'}}>
                <SocialIcon
                  type="pinterest"
                  onPress={() => {
                    alert('pinterest');
                  }}
                />
                <Text style={{textAlign: 'center'}}>pinterest</Text>
              </View>
              <View style={{flexDirection: 'column'}}>
                <SocialIcon
                  type="quora"
                  onPress={() => {
                    alert('quora');
                  }}
                />
                <Text style={{textAlign: 'center'}}>quora</Text>
              </View>
              <View style={{flexDirection: 'column'}}>
                <SocialIcon
                  type="reddit-alien"
                  onPress={() => {
                    alert('reddit');
                  }}
                />
                <Text style={{textAlign: 'center'}}>reddit-alien</Text>
              </View>
            </View>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={{flexDirection: 'column'}}>
                <SocialIcon
                  type="soundcloud"
                  onPress={() => {
                    alert('soundcloud');
                  }}
                />
                <Text style={{textAlign: 'center'}}>soundcloud</Text>
              </View>

              <View style={{flexDirection: 'column'}}>
                <SocialIcon
                  type="steam"
                  onPress={() => {
                    alert('steam');
                  }}
                />
                <Text style={{textAlign: 'center'}}>steam</Text>
              </View>
              <View style={{flexDirection: 'column'}}>
                <SocialIcon
                  type="youtube"
                  onPress={() => {
                    alert('youtube');
                  }}
                />
                <Text style={{textAlign: 'center'}}>youtube</Text>
              </View>
              <View style={{flexDirection: 'column'}}>
                <SocialIcon
                  type="tumblr"
                  onPress={() => {
                    alert('tumblr');
                  }}
                />
                <Text style={{textAlign: 'center'}}>tumblr</Text>
              </View>
              <View style={{flexDirection: 'column'}}>
                <SocialIcon
                  type="twitch"
                  onPress={() => {
                    alert('twitch');
                  }}
                />
                <Text style={{textAlign: 'center'}}>twitch</Text>
              </View>
            </View>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={{flexDirection: 'column'}}>
                <SocialIcon
                  type="twitter"
                  onPress={() => {
                    alert('twitter');
                  }}
                />
                <Text style={{textAlign: 'center'}}>twitter</Text>
              </View>
              <View style={{flexDirection: 'column'}}>
                <SocialIcon
                  type="vimeo"
                  onPress={() => {
                    alert('vimeo');
                  }}
                />
                <Text style={{textAlign: 'center'}}>vimeo</Text>
              </View>
              <View style={{flexDirection: 'column'}}>
                <SocialIcon
                  type="wordpress"
                  onPress={() => {
                    alert('wordpress');
                  }}
                />
                <Text style={{textAlign: 'center'}}>wordpress</Text>
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                }}>
                <SocialIcon
                  type="stumbleupon"
                  onPress={() => {
                    alert('stumbleupon');
                  }}
                />
                <Text style={{textAlign: 'center'}}>stumbleupon</Text>
              </View>
            </View>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignContent: 'center',
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    width: '100%',
                    alignItems: 'center',
                    flexDirection: 'column',
                  }}>
                  <SocialIcon
                    type="stack-overflow"
                    onPress={() => {
                      alert('stack');
                    }}
                  />
                  <Text style={{flex: 1, textAlign: 'center'}}>
                    stack-overflow
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignContent: 'center',
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    width: '100%',
                    alignItems: 'center',
                    flexDirection: 'column',
                  }}>
                  <SocialIcon
                    type="google-plus-official"
                    onPress={() => {
                      alert('google');
                    }}
                  />
                  <Text style={{textAlign: 'center'}}>
                    google-plus-official
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <SocialIcon
            title="Sign In angellist"
            style={{width: 300}}
            button
            type="angellist"
            onPress={() => {
              alert('angellist');
            }}
          />
          <SocialIcon
            title="Sign In codepen"
            style={{width: 300}}
            button
            type="codepen"
            onPress={() => {
              alert('codepen');
            }}
          />
          <SocialIcon
            title="Sign In envelope"
            style={{width: 300}}
            button
            type="envelope"
            onPress={() => {
              alert('envelope');
            }}
          />
          <SocialIcon
            title="Sign In etsy"
            style={{width: 300}}
            button
            type="etsy"
            onPress={() => {
              alert('etsy');
            }}
          />
          <SocialIcon
            button
            style={{width: 300}}
            title="Sign In facebook"
            type="facebook"
            onPress={() => {
              //Action to perform on press of Social Icon
              alert('facebook');
            }}
          />
          <SocialIcon
            title="Sign In foursquare"
            style={{width: 300}}
            button
            type="foursquare"
            onPress={() => {
              alert('foursquare');
            }}
          />
          <SocialIcon
            title="Sign In Github Alt"
            style={{width: 300}}
            button
            type="github-alt"
            onPress={() => {
              alert('github-alt');
            }}
          />
          <SocialIcon
            title="Sign In github"
            style={{width: 300}}
            button
            type="github"
            onPress={() => {
              alert('github');
            }}
          />
          <SocialIcon
            title="Sign In gitlab"
            style={{width: 300}}
            button
            type="gitlab"
            onPress={() => {
              alert('gitlab');
            }}
          />
          <SocialIcon
            title="Sign In instagram"
            style={{width: 300}}
            button
            type="instagram"
            onPress={() => {
              alert('instagram');
            }}
          />
          <SocialIcon
            title="Sign In linkedin"
            style={{width: 300}}
            button
            type="linkedin"
            onPress={() => {
              alert('linkedin');
            }}
          />
          <SocialIcon
            title="Sign In medium"
            style={{width: 300}}
            button
            type="medium"
            onPress={() => {
              alert('medium');
            }}
          />
          <SocialIcon
            title="Sign In pinterest"
            style={{width: 300}}
            button
            type="pinterest"
            onPress={() => {
              alert('pinterest');
            }}
          />
          <SocialIcon
            title="Sign In quora"
            style={{width: 300}}
            button
            type="quora"
            onPress={() => {
              alert('quora');
            }}
          />
          <SocialIcon
            title="Sign In reddit-alien"
            style={{width: 300}}
            button
            type="reddit-alien"
            onPress={() => {
              alert('reddit');
            }}
          />
          <SocialIcon
            title="Sign In soundcloud"
            style={{width: 300}}
            button
            type="soundcloud"
            onPress={() => {
              alert('soundcloud');
            }}
          />
          <SocialIcon
            title="Sign In Stack Overflow"
            style={{width: 300}}
            button
            type="stack-overflow"
            onPress={() => {
              alert('stack-overflow');
            }}
          />
          <SocialIcon
            title="Sign In steam"
            style={{width: 300}}
            button
            type="steam"
            onPress={() => {
              alert('steam');
            }}
          />
          <SocialIcon
            title="Sign In youtube"
            style={{width: 300}}
            button
            type="youtube"
            onPress={() => {
              alert('youtube');
            }}
          />
          <SocialIcon
            title="Sign In tumblr"
            style={{width: 300}}
            button
            type="tumblr"
            onPress={() => {
              alert('tumblr');
            }}
          />
          <SocialIcon
            title="Sign In twitch"
            style={{width: 300}}
            button
            type="twitch"
            onPress={() => {
              alert('twitch');
            }}
          />
          <SocialIcon
            title="Sign In twitter"
            style={{width: 300}}
            button
            type="twitter"
            onPress={() => {
              alert('twitter');
            }}
          />
          <SocialIcon
            title="Sign In Google Plus"
            style={{width: 300}}
            button
            type="google-plus-official"
            onPress={() => {
              alert('google');
            }}
          />
          <SocialIcon
            title="Sign In vimeo"
            style={{width: 300}}
            button
            type="vimeo"
            onPress={() => {
              alert('vimeo');
            }}
          />
          <SocialIcon
            title="Sign In wordpress"
            style={{width: 300}}
            button
            type="wordpress"
            onPress={() => {
              alert('wordpress');
            }}
          />
          <SocialIcon
            title="Sign In stumbleupon"
            style={{width: 300}}
            button
            type="stumbleupon"
            onPress={() => {
              alert('stumbleupon');
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  heading: {
    fontSize: 20,
    textAlign: 'center',
  },
  textStyle: {
    fontSize: 16,
    textAlign: 'center',
    color: 'grey',
    marginVertical: 16,
  },
});

export default SocialIconCom;