const mongoose = require("mongoose");

const propertySchema = mongoose.Schema(
  {
    // BasicDetails
    userId: {
      //User who has logged in
      type: mongoose.Schema.ObjectId,
      required: [true, "UserId Required"],
      ref: "User",
    },
    superCategoryId: {
      //what kind of property residential or commercial
      type: mongoose.Schema.ObjectId,
      required: [true, "Supercategoryid Required"],
      ref: "SuperCategory",
    },
    superCategory: {
      type: String,
      required: [true, "Please Enter SuperCategory Name"],
      ref: "SuperCategory",
    },
    categoryId: {
      // I'm Looking to sell or rent or PG
      type: mongoose.Schema.ObjectId,
      required: [true, "Categoryid Required"],
      ref: "Category",
    },
    category: {
      type: String,
      required: [true, "Please Enter Category Name"],
      ref: "Category",
    },
    subCategoryId: {
      // propertyVarient flat or Vills or etc..
      type: mongoose.Schema.ObjectId,
      required: [true, "SubCategoryid Required"],
      ref: "SubCategory",
    },
    subCategory: {
      type: String,
      required: [true, "Please Enter SubCategory Name"],
      ref: "SubCategory",
    },
    propertyID: Number,
    propertyUrl: String, // it should be unique

    // Loaction Details
    recentLocation: String,
    state: {
      type: String,
      required: [true, "Please Enter State"],
    },
    city: {
      type: String,
      required: [true, "Please Enter City"],
    },
    apartment: String,
    locality: {
      type: String,
      required: [true, "Please Enter Your Locality"],
    },
    houseNo: String,
    // Property Profile
    apartmentType: String, // 2BHK or 3 BHK or 4BHK
    noofBedrooms: Number,
    noofBathrooms: Number,
    balconies: Number,
    carpetArea: Number,
    selectYards: String,
    poojaRoom: {
      type: Boolean,
      default: false,
    },
    studyRoom: {
      type: Boolean,
      default: false,
    },
    servantRoom: {
      type: Boolean,
      default: false,
    },
    storeRoom: {
      type: Boolean,
      default: false,
    },

    roomType: {
      sharingcountRoomStatus: String,
      totalnoBed: String,
      noofBedsavailable: String,
      totalnoRoom: String,
      noofRoomsavailable: String,
    },
    attachbathroom: {
      type: Boolean,
      default: false,
    },
    attachbalcony: {
      type: Boolean,
      default: false,
    },

    furnishing: String,
    reservedParking: {
      openparking: {
        type: Number,
        default: 0,
      },
      coverparking: {
        type: Number,
        default: 0,
      },
    },
    noofFloor: Number,
    propertyOnFloor: String,
    availabilityStatus: String, // Ready to move or Under Construction
    propertyAge: String, //0-1 yrs or 1-5 yrs or 5-10 yrs or 10+ yrs
    availableforGender: String, // boys or girls or any
    suitableFor: {
      Students: {
        type: Boolean,
        default: false,
      },
      WorkingProfessionals: {
        type: Boolean,
        default: false,
      },
    },

    possessionby: {
      year: {
        type: String,
      },
      month: {
        type: String,
      },
    }, // by 2024 or by 2025 or by 2026 so on...
    // Photos
    titleImg: [
      {
        type: String,
      },
    ],
    DeskImg: [
      {
        type: String,
      },
    ],
    //Pricing & Others

    pg: {
      expextedrent: String,
      securitydeposite: String,
      foodDetails: String,
      contractDuration: String,
      monthofNotice: String,
      yearlyLeavingCharges: String,
      lastentrytime: String,
      anyotherRule: String,
    },
    includesprice:{
      laundry: {
        type: Boolean,
        default: false,
      },
      electricity: {
        type: Boolean,
        default: false,
      },
      water: {
        type: Boolean,
        default: false,
      },
      wifi: {
        type: Boolean,
        default: false,
      },
      housekeeping: {
        type: Boolean,
        default: false,
      },
      dth: {
        type: Boolean,
        default: false,
      },
      noneoftheabove: {
        type: Boolean,
        default: false,
      },
    },
    serviceExcluding: {
      laundryExtracharge: String,
      waterExtracharge:String,
      wifiExtracharge: String,
      housekeepingExtracharge: String,
      dthExtracharge: String,String,
    },
    houseRules: {
      pet: String,
      Visitors: String,
      Smoking: String,
      Alcohol: String,
      Party: String,
    },
    //pg end
    ownerShip: String, //Freehold or lease Hold or Co-operative or Power of Attorney
    expectedPrice: {
      type: String,
    },
    pricePerSqft: Number,
    inclusivePrice: {
      type: Boolean,
      default: false,
    },
    govtCharges: {
      type: Boolean,
      default: false,
    },
    priceNegotiable: {
      type: Boolean,
      default: false,
    },

    boosted: {
      type: Boolean,
      default: false,
    },
    maintenanceAmount: String, //Monthly or Annually or One time
    maintenanceTerm: String,
    expectedRental: String,
    bookingAmount: String,
    annualPayable: String,
    membershipCharge: String,
    unicProperty: {
      //Text Area for Property Unique
      type: String,
      required: [true, "Please Fill the Field"],
    },
    percentageCompletion: {
      type: String,
      // required: [true, "Please Provide Percentage Completion"],
      // default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Property", propertySchema);
