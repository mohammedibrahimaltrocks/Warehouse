/* eslint-disable react/no-typos */
/* eslint-disable no-lonely-if */
/* eslint-disable prettier/prettier */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable radix */
/* eslint-disable one-var */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-bitwise */
/* eslint-disable import/no-unresolved */
/* eslint-disable object-shorthand */
/* eslint-disable consistent-return */
/* eslint-disable no-return-assign */
/* eslint-disable prefer-template */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-else-return */
/* eslint-disable no-plusplus */
/* eslint-disable array-callback-return */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/lines-between-class-members */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable func-names */
/* eslint-disable react/sort-comp */
/* eslint-disable react/no-deprecated */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-state */
import React, { Component, useEffect } from 'react';
import bwipjs from 'bwip-js';
import { Row, Col } from 'react-bootstrap';

const ImageRender = (BarCodeData) => {
  useEffect(() => {
    // console.log("print barcode text " + BarCodeData.BarCodetxt);
    // console.log("Index value " + BarCodeData.idv);
    if (BarCodeData.BarCodetxt !== '' && BarCodeData.idv !== '') {
      let canvas = bwipjs.toCanvas(BarCodeData.idv, {
        bcid: 'code128', // Barcode type
        text: BarCodeData.BarCodetxt, // Text to encode
        scaleX: 3, // 3x scaling factor
        scaleY: 4,
        height: 7, // Bar height, in millimeters
        includetext: true, // Show human-readable text
        textxalign: 'center', // Always good to set this
      });
    }
  });
  return (
    <div style={{ width: '100%', textAlign: 'center' }}>
      {(() => {
        if (
          BarCodeData.viewheader === true ||
          BarCodeData.viewheader === undefined
        ) {
          return (
            <h1 style={{ textAlign: 'center' }}>{BarCodeData.BarCodetxt}</h1>
          );
        }
      })()}
      <canvas id={BarCodeData.idv}></canvas>
      {/* <Barcode
        renderer="canvas"
        key={BarCodeData.idv}
        value={BarCodeData.BarCodetxt}
        fontSize={15}
        height={60}
        margin={2}
        marginLeft={50}
        marginRight={50}
        width={3}
      /> */}
    </div>
  );
};

const SingleImageRender = (BarCodeData) => {
  useEffect(() => {
    // console.log("print barcode text " + BarCodeData.BarCodetxt);
    // console.log("Index value " + BarCodeData.idv);
    if (BarCodeData.BarCodetxt !== '' && BarCodeData.idv !== '') {
      let canvas = bwipjs.toCanvas(BarCodeData.idv, {
        bcid: 'code128', // Barcode type
        text: BarCodeData.BarCodetxt, // Text to encode
        scaleX: 5, // 3x scaling factor
        scaleY: 5,
        height: 10, // Bar height, in millimeters
        includetext: true, // Show human-readable text
        textxalign: 'center', // Always good to set this
      });
    }
  });
  return (
    <div>
      <div className="pagebreak" style={{ paddingBottom: '5%' }}></div>
      <div style={{ textAlign: 'center' }}>
        <Row className="justify-content-center" style={{ paddingBottom: '5%' }}>
          <Col>
            <h1 className="display-2">PALLET NUMBER</h1>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col>
            <canvas id={BarCodeData.idv}></canvas>
          </Col>
        </Row>
      </div>
    </div>
  );
};

const ImageRender2D = (BarCodeData) => {
  useEffect(() => {
    // console.log("print barcode text " + BarCodeData.BarCodetxt);
    // console.log("Index value " + BarCodeData.idv);
    if (BarCodeData.BarCodetxt !== '' && BarCodeData.idv !== '') {
      let canvas = bwipjs.toCanvas(BarCodeData.idv, {
        bcid: 'pdf417', // Barcode type
        text: BarCodeData.BarCodetxt, // Text to encode
        scale: 5, // 3x scaling factor
        height: 20, // Bar height, in millimeters
        includetext: true, // Show human-readable text
        textxalign: 'center', // Always good to set this
      });
    }
  });
  return (
    <div style={{ width: '100%', textAlign: 'center', paddingLeft: '1%' }}>
      {(() => {
        if (
          BarCodeData.viewheader === true ||
          BarCodeData.viewheader === undefined
        ) {
          return (
            <h2 style={{ textAlign: 'center' }}>{BarCodeData.BarCodetxt}</h2>
          );
        }
      })()}
      {/* <Barcode
        key={BarCodeData.idv}
        value={BarCodeData.BarCodetxt}
        fontSize={15}
        height={60}
        margin={2}
        marginLeft={50}
        marginRight={50}
        width={3}
      /> */}
      <canvas id={BarCodeData.idv}></canvas>
    </div>
  );
};

const RenderImage = {
  ImageRender,
  ImageRender2D,
  SingleImageRender,
};
export default RenderImage;
