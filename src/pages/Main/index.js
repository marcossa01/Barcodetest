/* eslint-disable no-alert */
/* eslint-disable no-plusplus */
import React, { useState } from 'react';

import Scanner from './Scanner';
import Results from './Results';

function Main() {
  const [code, setCode] = useState();

  return (
    <>
      <Scanner onScan={setCode} />
      {code && <Results code={code} />}
    </>
  );
}

export default Main;
