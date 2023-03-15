import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '@layouts';
import { useSocketIO } from '@providers';
import ReactJson from 'react-json-view';

function Debug() {
  const { socket } = useSocketIO();
  const [data, setData] = useState({});

  useEffect(() => {
    socket.on('bot:message', (data) => {
      setData(data);
    });

    return () => {
      socket.off('bot:message');
    };
  }, [socket]);
  return (
    <div>
      <ReactJson src={data} theme="tomorrow" />
    </div>
  );
}

Debug.getLayout = (page: React.ReactElement) => (
  <DashboardLayout title="Bot Debug">{page}</DashboardLayout>
);

export default Debug;
