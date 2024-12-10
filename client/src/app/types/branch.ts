export interface BranchMapMarker {
    branch: any;
    position: {
        lat: number;
        lng: number;
    };
    title: string;
    options: {
        animation: google.maps.Animation;
    };
    label: string;
    click?: () => void;
}