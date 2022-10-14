/* eslint-disable no-alert */
/* eslint-disable no-plusplus */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import Quagga from 'quagga';

import { validateCode } from '../../../services/codeService';

import { Container, Video, ScanMarker } from './styles';

function Scanner({ onScan }) {
  let scannerAttemps = 0;

  const onDetected = (result) => {
    Quagga.offDetected(onDetected);
    const codeResult = result.codeResult.code;

    if (validateCode(codeResult)) {
      onScan(codeResult);
      return;
    }
    if (scannerAttemps >= 5) {
      alert('Não é possível ler o código');
    }
    scannerAttemps++;
    Quagga.onDetected(onDetected);
  };

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      Quagga.init(
        {
          inputStream: {
            name: 'Live',
            type: 'LiveStream',
            target: document.querySelector('#video'),
            constraints: {
              facingMode: 'enviroment',
            },
          },
          numOfWorkers: 1,
          locate: true,
          decoder: {
            readers: ['ean_reader', 'code_128_reader'],
          },
        },
        (err) => {
          if (err) {
            console.error(err);
            alert('Erro ao abrir a câmera');
            return;
          }
          Quagga.start();
        },
        Quagga.onDetected(onDetected)
      );
    }
  }, []);
  return (
    <>
      <Video id="video" />
      <Container>
        <ScanMarker>
          <img
            src="../../../assets/images/scan-mark.svg"
            alt="Leitor de QR"
            width="260"
            height="260"
          />
          <p className="label">Aponte para o código de barras</p>
        </ScanMarker>

        <img
          className="logo"
          src="../../../assets/images/logoMP.png"
          alt="Logo MP"
          width="130"
          height="130"
        />
      </Container>
    </>
  );
}

export default Scanner;

Scanner.propTypes = {
  onScan: PropTypes.func.isRequired,
};
