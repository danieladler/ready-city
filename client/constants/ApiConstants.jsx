var railsEnv = $('body').data('env'),
    ApiUrl;

if (railsEnv === 'development') {
  ApiUrl = "http://localhost:5000";
} else if (railsEnv === 'production') {
  ApiUrl = "https://ready-city-stage.herokuapp.com";
}

export const API_URL = ApiUrl;
