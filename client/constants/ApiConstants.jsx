var railsEnv = $('body').data('env'),
    ApiUrl;

if (railsEnv === 'development') {
  ApiUrl = "http://localhost:5000";
} else if (railsEnv === 'production') {
  ApiUrl = "http://www.ready.city";
}

export const API_URL = ApiUrl;
