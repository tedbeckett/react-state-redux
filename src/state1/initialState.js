export const initialState = {
    entities: {
        fleets: {
            byId: {}
        },
        airplanes: {
            byId: {}
        },
        systems: {
            byId: {}
        }
    },
    ui: {
        selectedFleetId: null,
        selectedAirplaneId: null,
        selectedSystemId: null    
    }
}
