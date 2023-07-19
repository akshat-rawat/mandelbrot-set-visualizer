importScripts("math.js");

onmessage = (e) => {
  var data = e.data;
  var workerNumber = data.workerNumber;
  var rowNumber = data.rowNumber;
  var columnCount = data.columnCount;
  var iterationCounts = new Array(columnCount);
  var imag = data.negy + (rowNumber * (data.posy - data.negy)) / 480;
  for (let j = 0; j < columnCount; j++) {
    var real = data.negx + (j * (data.posx - data.negx)) / 640;
    z = math.complex(0, 0);

    iter = 0;
    c = math.complex(real, imag);
    while (++iter != data.maxIterations) {
      if (Math.pow(z.re, 2) > 4 || Math.pow(z.im, 2) > 8) {
        break;
      }
      z = math.add(math.multiply(z, z), c);
    }
    iterationCounts[j] = iter;
  }
  postMessage({
    iterationCounts: iterationCounts,
    workerNumber: workerNumber,
    row: rowNumber,
  });
};
