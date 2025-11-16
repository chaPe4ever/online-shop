const formatTime = () => {
  const now = new Date();
  return now.toLocaleTimeString('en-US', {
    hour12: false,
    fractionalSecondDigits: 3,
  });
};

const formatDuration = (startTime) => {
  const duration = Date.now() - startTime;
  return duration < 1000 ? `${duration}ms` : `${(duration / 1000).toFixed(2)}s`;
};

const getStatusColor = (status) => {
  if (status >= 200 && status < 300) return '#4CAF50'; // Green
  if (status >= 300 && status < 400) return '#2196F3'; // Blue
  if (status >= 400 && status < 500) return '#FF9800'; // Orange
  if (status >= 500) return '#F44336'; // Red
  return '#9E9E9E'; // Grey
};

const logRequest = (config) => {
  const _ = formatTime();

  console.group(
    `%c🚀 ${config.method?.toUpperCase()} %c${config.url}`,
    'color: #4CAF50; font-weight: bold',
    'color: #2196F3; font-weight: bold'
  );
  //   console.log('%cTime:', 'color: #9E9E9E', _);
  console.log('%cBase URL:', 'color: #9E9E9E', config.baseURL);
  console.log('%cHeaders:', 'color: #FF9800', config.headers);

  if (config.params && Object.keys(config.params).length > 0) {
    console.log('%cParams:', 'color: #009688', config.params);
  }

  if (config.data) {
    console.log('%cData:', 'color: #9C27B0', config.data);
  }

  console.groupEnd();

  // Store start time for duration calculation
  config.metadata = { startTime: Date.now() };

  return config;
};

const logResponse = (response) => {
  const duration = formatDuration(
    response.config.metadata?.startTime || Date.now()
  );
  const statusColor = getStatusColor(response.status);

  console.group(
    `%c✅ ${response.status} %c${response.config.method?.toUpperCase()} %c${response.config.url} %c${duration}`,
    `color: ${statusColor}; font-weight: bold`,
    'color: #4CAF50; font-weight: bold',
    'color: #2196F3; font-weight: bold',
    'color: #9E9E9E'
  );
  console.log(
    '%cStatus:',
    'color: #4CAF50',
    `${response.status} ${response.statusText}`
  );
  console.log('%cHeaders:', 'color: #FF9800', response.headers);
  console.log('%cData:', 'color: #9C27B0', response.data);
  console.groupEnd();

  return response;
};

const logError = (error) => {
  const status = error.response?.status;
  const statusColor = status ? getStatusColor(status) : '#F44336';
  const duration = error.config?.metadata?.startTime
    ? formatDuration(error.config.metadata.startTime)
    : '0ms';

  console.group(
    `%c❌ ${status || 'ERROR'} %c${error.config?.method?.toUpperCase() || 'REQUEST'} %c${error.config?.url || 'Unknown'} %c${duration}`,
    `color: ${statusColor}; font-weight: bold`,
    'color: #F44336; font-weight: bold',
    'color: #2196F3; font-weight: bold',
    'color: #9E9E9E'
  );

  if (error.response) {
    // Server responded with error status
    console.log(
      '%cStatus:',
      'color: #F44336',
      `${error.response.status} ${error.response.statusText}`
    );
    console.log('%cHeaders:', 'color: #FF9800', error.response.headers);
    console.log('%cError Data:', 'color: #9C27B0', error.response.data);
  } else if (error.request) {
    // Request made but no response received
    console.log('%cNo Response Received', 'color: #F44336; font-weight: bold');
    console.log('%cRequest:', 'color: #FF9800', error.request);
  } else {
    // Error in request setup
    console.log('%cMessage:', 'color: #F44336', error.message);
  }

  if (error.config) {
    console.log('%cConfig:', 'color: #9E9E9E', error.config);
  }

  console.groupEnd();

  return Promise.reject(error);
};

// Export as object similar to axios-logger
export const AxiosLogger = {
  requestLogger: logRequest,
  responseLogger: logResponse,
  errorLogger: logError,
};

// Named exports for flexibility
export const requestLogger = logRequest;
export const responseLogger = logResponse;
export const errorLogger = logError;
