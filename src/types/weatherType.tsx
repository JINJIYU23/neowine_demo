export interface WeatherData {
  coord: {
    lon: number; // 126.978
    lat: number; // 37.5665
  };

  weather: Array<{
    id: number; // 날씨 ID
    main: string; // 날씨 메인
    description: string; // 날씨 설명
    icon: string; // 날씨 아이콘 코드
  }>;

  base: string; // "stations"

  main: {
    temp: number; // 30.76 (현재 온도)
    feels_like: number; // 31.86 (체감 온도)
    temp_min: number; // 30.76 (최저 온도)
    temp_max: number; // 31.78 (최고 온도)
    pressure: number; // 1010 (기압)
    humidity: number; // 48 (습도 %)
    sea_level: number; // 1010 (해수면 기압)
    grnd_level: number; // 1001 (지면 기압)
  };

  visibility: number; // 10000 (가시거리 미터)

  wind: {
    speed: number; // 2.06 (풍속 m/s)
    deg: number; // 170 (풍향 도)
  };

  clouds: {
    all: number; // 0 (구름량 %)
  };

  dt: number; // 1756878257 (Unix timestamp)

  sys: {
    type: number; // 1
    id: number; // 8105
    country: string; // "KR"
    sunrise: number; // 1756847034 (일출)
    sunset: number; // 1756893578 (일몰)
  };

  timezone: number; // 32400 (시간대 오프셋 초)

  id: number; // 1835848 (도시 ID)
  name: string; // "Seoul"
  cod: number; // 200 (HTTP 상태 코드)
}
