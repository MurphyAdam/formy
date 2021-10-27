export interface PlaceObjectProps {
    name: string,
    formatted_address: string,
    geometry: keyable,
    business_status?: string,
    [k: string]: any;
}