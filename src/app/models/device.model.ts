export interface Device {
    path: string,
    manufacturer: string,
    serialNumber: string,
    pnpId: string,
    locationId: string,
    vendorId: string,
    productId: string,
    isConnected: boolean
}