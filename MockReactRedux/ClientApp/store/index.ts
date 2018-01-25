import * as WeatherForecasts from './WeatherForecasts';
import * as Counter from './Counter';
import * as Register from './Register';
import * as Login from './Login';

// The top-level state object
export interface IApplicationState {
    counter: Counter.CounterState;
    weatherForecasts: WeatherForecasts.IWeatherForecastsState;
    register: Register.IRegisterState;
    //login: Login.ILoginState;
}

// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
export const reducers = {
    counter: Counter.reducer,
    weatherForecasts: WeatherForecasts.reducer,
    register: Register.reducer,
    //login: Login.reducer
};

// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are
// correctly typed to match your store.
export interface IAppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => IApplicationState): void;
}
