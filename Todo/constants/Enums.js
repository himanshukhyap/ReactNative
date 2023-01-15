import Colors from './Colors';

const Validation = Object.freeze({
    Required: 'Required',
    Email: 'Email',
    EmailRequired: 'EmailRequired',
    Mobile: 'Mobile',
    MobileRequired: 'MobileRequired',
    Number: 'Number',
    NumberRequired: 'NumberRequired',
    Decimal: 'Decimal',
    DecimalRequired: 'DecimalRequired',
    MinLength: 'MinimumLength',
    MinLengthRequired: 'MinLengthRequired'
});

const Keyboard = Object.freeze({
    Default: 'default',
    Number: 'numeric',
    Email: 'email-address',
    Phone: 'phone-pad'
});

const Capitalize = Object.freeze({
    None: 'none',
    Words: 'words',
    Sentences: 'sentences',
    Characters: 'characters'
});

/* These names are of Material Icons Only */
const ActionButtons = Object.freeze({
    Edit: 'mode-edit',
    Delete: 'delete-forever',
    View: 'remove-red-eye',
    Place: 'place',
    Attachment: 'attach-file',
    Download: 'file-download',
    Upload: 'file-upload',
    Assignment: 'assignment-ind',
    Accept: 'assignment-turned-in',
    Person: 'person-pin-circle',
    Schedule: 'schedule'
});

const ActionButtonColors = Object.freeze({
    Edit: Colors.darkGreen,
    Delete: Colors.red,
    View: Colors.primaryDark,
    Place: Colors.black2,
    Attachment: Colors.primaryDark,
    Download: Colors.darkGreen,
    Upload: Colors.darkGreen,
    Assignment: Colors.darkGreen,
    Accept: Colors.primaryDark,
    Person: Colors.black2,
    Schedule: Colors.black2
});

const UserTypes = Object.freeze({
    Admin: 1,
    Vendor: 2,
    LogisticManager: 3,
    PDA: 4,
    WarehouseManager: 5,
    Marketing: 6
});

const ColRequestStatus = Object.freeze({
    Pending: 1,
    InProcess: 2,
    Completed: 3,
    MovedToWarehouse: 4
});

const UploadFileTypes = Object.freeze({
    Pdf: "application/pdf",
    Image: "image/*",
	Any: "*/*"
});

const TransactionTypes = Object.freeze({
    Inward: 1,
    Outward: 2
});

const CollStatsTitle = Object.freeze({
    1: "State Name",
    2: "City Name",
    3: "Firm Name"
});

const CertOrLic = Object.freeze({
    Certificate: 1,
    License: 2
});

export const ValidationType = Validation;
export const KeyboardType = Keyboard;
export const CapitalizeType = Capitalize;
export const ActionIcons = ActionButtons;
export const ActionIconColors = ActionButtonColors;
export const UserType = UserTypes;
export const RequestStatus = ColRequestStatus;
export const FileType = UploadFileTypes;
export const TransactionType = TransactionTypes;
export const CollectionStatsTitles = CollStatsTitle;
export const CertificateOrLicense = CertOrLic;