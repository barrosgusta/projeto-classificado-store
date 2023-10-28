type Seller = {
    id: string;
    stripeCustomerId: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    ads: CarAd[];
    subscription: Subscription;
    subscriptionId: number;
    isAdmin: boolean;
    createdAt: Date;
    updatedAt: Date;
};
  
type CarAd = {
    seller: Seller;
    sellerId: string;
    stateId: number;
    state: State;
    cityId: number;
    city: City;
    id: string;
    customBrand?: string | null;
    customModel?: string | null;
    customYear?: string | null;
    brandId?: number | null;
    brand: CarBrand | null;
    modelId?: number | null;
    model: CarModel | null;
    yearId?: string | null;
    year: CarYear | null;
    price: number;
    kms: number;
    inductionTypeId: number;
    inductionType: InductionType;
    fuelTypeId: number;
    fuelType: FuelType;
    gearboxTypeId: number;
    gearboxType: GearboxType;
    engineTuningId: number;
    engineTuning: EngineTuning;
    description: string;
    timesChanged: number;
    access: Access[];
    isArchived: boolean;
    isPending: boolean;
    isRejected: boolean;
    rejectedReason?: string | null;
    images: Image[];
    createdAt: Date;
    updatedAt: Date;
};
  
type Access = {
    id: number;
    adId: string;
    ad: CarAd;
    createdAt: Date;
    updatedAt: Date;
};
  
type CarBrand = {
    id: number;
    name: string;
    models: CarModel[];
    years: CarYear[];
    ads: CarAd[];
};
  
type CarModel = {
    id: number;
    name: string;
    brandId: number;
    brand: CarBrand;
    years: CarYear[];
    ads: CarAd[];
};
  
type CarYear = {
    id: string;
    name: string;
    brandId: number;
    brand: CarBrand;
    modelId: number;
    model: CarModel;
    ads: CarAd[];
};
  
type GearboxType = {
    id: number;
    name: string;
    ads: CarAd[];
};
  
type InductionType = {
    id: number;
    name: string;
    ads: CarAd[];
};
  
type FuelType = {
    id: number;
    name: string;
    ads: CarAd[];
};
  
type EngineTuning = {
    id: number;
    name: string;
    ads: CarAd[];
};
  
type Subscription = {
    id: number;
    maxAdChange?: number | null;
    maxAds?: number | null;
    maxAdOnlineDays?: number | null;
    maxImagesPerAd: number;
    exposure: number;
    description: string;
    price: number;
    sellers: Seller[];
};
  
type Image = {
    id: string;
    adId: string;
    ad: CarAd;
    url: string;
    createdAt: Date;
    updatedAt: Date;
};
  
type City = {
    id: number;
    name: string;
    stateId: number;
    state: State;
    ads: CarAd[];
};
  
type State = {
    id: number;
    name: string;
    acronym: string;
    cities: City[];
    ads: CarAd[];
};
  