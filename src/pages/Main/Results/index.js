import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

function Results({ code }) {
  return (
    <Container>
      <div>
        <p>Verifique o código de barras:</p>
      </div>
      <div>
        <p>{code}</p>
      </div>
    </Container>
  );
}

Results.propTypes = {
  code: PropTypes.string.isRequired,
};

export default Results;
