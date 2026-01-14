import { createContext, useContext, useEffect, useState } from 'react';
import { defaultSort, todayTomorrow_All, week } from '../Mydata';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const currentDate = new Date();
  const hour = currentDate.getHours();
  const minute = currentDate.getMinutes();
  const day = currentDate.getDay();
  const divide = hour + minute / 60 < 17.5;
  const AuthorizationKey = 'CWA-565AE271-EF5E-4576-9249-408C28D39816';
  const API_URL = `https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-D0047-091?Authorization=${AuthorizationKey}&format=JSON`;

  useEffect(() => {
    async function getWeather() {
      setLoading(true);
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`伺服器錯誤：${response.status}`);
        }
        const data = await response.json();
        setData(data.records.Locations[0]);
      } catch (error) {
        console.error('抓取資料失敗：', error.message);
        alert('目前無法取得資料，請檢查網路連線');
      } finally {
        setLoading(false);
      }
    }
    getWeather();
  }, []);

  const sortedData = data.Location?.sort((a, b) => {
    const indexA = defaultSort.indexOf(a.LocationName);
    const indexB = defaultSort.indexOf(b.LocationName);
    return indexA - indexB;
  });

  const dday = divide ? day : day + 1;
  const cut = week.days.slice(0, dday);
  const newDayOrder = week.days.slice(dday).concat(cut);

  const todayTomorrow = divide
    ? todayTomorrow_All.slice(0, 3)
    : todayTomorrow_All.slice(1);

  const formatTime = (dateTime) => {
    if (!dateTime) return { date: '', time: '' };
    const date = dateTime.slice(5, 10);
    const time = dateTime.slice(11, 16);
    return { date, time };
  };

  return (
    <DataContext.Provider
      value={{
        loading,
        sortedData,
        newDayOrder,
        todayTomorrow,
        divide,
        formatTime,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
