import type { Option, Result } from "ts-results";

// gives the final flattened type after mapping, intersecting, or conditional logic
type Prettify<T> =
    & {
        [K in keyof T]: T[K];
    }
    & {};

type SafeError = {
    columnNumber: Option<number>;
    fileName: Option<string>;
    lineNumber: Option<number>;
    message: string;
    name: string;
    original: Option<string>;
    stack: Option<string>;
    status: Option<number>;
    timestamp: number;
};

type SafeSuccess<Data = unknown> = Option<Data>;

type SafeResult<Data = unknown> = Result<
    SafeSuccess<Data>,
    SafeError
>;

type ServerSuccessResponseGraphQL<Data = unknown> = {
    accessToken: string;
    dataBox: Array<Data>;
    message: string;
    statusCode: number;
    timestamp: Date;
    totalDocuments?: number;
    totalPages?: number;
    // requestId?: string;
    // extensions?: Record<string, unknown>;
    // path?: string[];
};

type ServerErrorResponseGraphQL = {
    accessToken: string;
    dataBox: [];
    message: string;
    statusCode: number;
    timestamp: Date;
    totalDocuments?: number;
    totalPages?: number;
    // requestId?: string;
    // errors?: GraphQLFormattedError[];
    // extensions?: Record<string, unknown>;
    // path?: string[];
};

type ServerResponseGraphQL<Data = unknown> =
    | ServerSuccessResponseGraphQL<Data>
    | ServerErrorResponseGraphQL;

type DecodedToken = {
    userId: string;
    username: string;
    roles: UserRoles;
    sessionId: string;
    iat: number;
    exp: number;
};

type UserSchema = {
    addressLine: string;
    city: string;
    country: Country;
    department: Department;
    email: string;
    firstName: string;
    jobPosition: JobPosition;
    lastName: string;
    orgId: number;
    parentOrgId: number;
    password: string;
    postalCodeCanada: CanadianPostalCode;
    postalCodeUS: USPostalCode;
    profilePictureUrl?: string;
    province: Province;
    roles: UserRoles;
    state: StatesUS;
    storeLocation: AllStoreLocations;
    username: string;
};

type UserDocument = UserSchema & {
    _id: string;
    createdAt: string;
    fileUploadId: string;
    updatedAt: string;
    __v: number;
};

type StoreLocation = "Edmonton" | "Calgary" | "Vancouver";
type AllStoreLocations = StoreLocation | "All Locations";
type UserRoles = ("Admin" | "Employee" | "Manager")[];

type Province =
    | "Not Applicable"
    | "Alberta"
    | "British Columbia"
    | "Manitoba"
    | "New Brunswick"
    | "Newfoundland and Labrador"
    | "Northwest Territories"
    | "Nova Scotia"
    | "Nunavut"
    | "Ontario"
    | "Prince Edward Island"
    | "Quebec"
    | "Saskatchewan"
    | "Yukon";

type StatesUS =
    | "Not Applicable"
    | "Alabama"
    | "Alaska"
    | "Arizona"
    | "Arkansas"
    | "California"
    | "Colorado"
    | "Connecticut"
    | "Delaware"
    | "Florida"
    | "Georgia"
    | "Hawaii"
    | "Idaho"
    | "Illinois"
    | "Indiana"
    | "Iowa"
    | "Kansas"
    | "Kentucky"
    | "Louisiana"
    | "Maine"
    | "Maryland"
    | "Massachusetts"
    | "Michigan"
    | "Minnesota"
    | "Mississippi"
    | "Missouri"
    | "Montana"
    | "Nebraska"
    | "Nevada"
    | "New Hampshire"
    | "New Jersey"
    | "New Mexico"
    | "New York"
    | "North Carolina"
    | "North Dakota"
    | "Ohio"
    | "Oklahoma"
    | "Oregon"
    | "Pennsylvania"
    | "Rhode Island"
    | "South Carolina"
    | "South Dakota"
    | "Tennessee"
    | "Texas"
    | "Utah"
    | "Vermont"
    | "Virginia"
    | "Washington"
    | "West Virginia"
    | "Wisconsin"
    | "Wyoming";

type CanadianPostalCode =
    `${string}${string}${string} ${string}${string}${string}`;
type USPostalCode = `${string}${string}${string}${string}${string}`;
type PostalCode = CanadianPostalCode | USPostalCode;

type Country = "Canada" | "United States";

type Department =
    | "Executive Management"
    | "Store Administration"
    | "Office Administration"
    | "Accounting"
    | "Human Resources"
    | "Sales"
    | "Marketing"
    | "Information Technology"
    | "Repair Technicians"
    | "Field Service Technicians"
    | "Logistics and Inventory"
    | "Customer Service"
    | "Maintenance";

type ExecutiveManagement =
    | "Chief Executive Officer"
    | "Chief Operations Officer"
    | "Chief Financial Officer"
    | "Chief Technology Officer"
    | "Chief Marketing Officer"
    | "Chief Sales Officer"
    | "Chief Human Resources Officer";

type HumanResources =
    | "Human Resources Manager"
    | "Compensation and Benefits Specialist"
    | "Health and Safety Specialist"
    | "Training Specialist"
    | "Recruiting Specialist";

type StoreAdministration =
    | "Store Manager"
    | "Shift Supervisor"
    | "Office Manager";

type OfficeAdministration =
    | "Office Administrator"
    | "Receptionist"
    | "Data Entry Specialist";

type Accounting =
    | "Accounting Manager"
    | "Accounts Payable Clerk"
    | "Accounts Receivable Clerk"
    | "Financial Analyst";

type Sales =
    | "Sales Manager"
    | "Sales Representative"
    | "Business Development Specialist"
    | "Sales Support Specialist"
    | "Sales Operations Analyst";

type Marketing =
    | "Marketing Manager"
    | "Digital Marketing Specialist"
    | "Graphic Designer"
    | "Public Relations Specialist"
    | "Marketing Analyst";

type InformationTechnology =
    | "IT Manager"
    | "Systems Administrator"
    | "IT Support Specialist"
    | "Database Administrator"
    | "Web Developer"
    | "Software Developer"
    | "Software Engineer";

type RepairTechnicians =
    | "Repair Technicians Supervisor"
    | "Electronics Technician"
    | "Computer Technician"
    | "Smartphone Technician"
    | "Tablet Technician"
    | "Audio/Video Equipment Technician";

type FieldServiceTechnicians =
    | "Field Service Supervisor"
    | "On-Site Technician";

type LogisticsAndInventory =
    | "Warehouse Supervisor"
    | "Inventory Clerk"
    | "Delivery Driver"
    | "Parts and Materials Handler"
    | "Shipper/Receiver";

type CustomerService =
    | "Customer Service Supervisor"
    | "Customer Service Representative"
    | "Technical Support Specialist";

type Maintenance =
    | "Maintenance Supervisor"
    | "Maintenance Worker"
    | "Custodian";

type JobPosition =
    | ExecutiveManagement
    | StoreAdministration
    | OfficeAdministration
    | Sales
    | Marketing
    | InformationTechnology
    | RepairTechnicians
    | FieldServiceTechnicians
    | LogisticsAndInventory
    | CustomerService
    | HumanResources
    | Accounting
    | Maintenance;

export type {
    AllStoreLocations,
    Country,
    DecodedToken,
    Department,
    JobPosition,
    PostalCode,
    Prettify,
    Province,
    SafeError,
    SafeResult,
    SafeSuccess,
    ServerErrorResponseGraphQL,
    ServerResponseGraphQL,
    ServerSuccessResponseGraphQL,
    StatesUS,
    StoreLocation,
    UserDocument,
    UserRoles,
    UserSchema,
};
