import React, { Component } from "react";
import "./App.css";
import InputData from "./InputData";

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      rows: 5,
      columns: 5,
      tableRowData: [],
      isCalculated: true,
      headers: [],
      isRandom: false,
      apiData: [],
      gaussData: [],
    };
    this.handleRowsChange = this.handleRowsChange.bind(this);
    this.handleGetRandomInt = this.handleGetRandomInt.bind(this);
    this.handleCalculate = this.handleCalculate.bind(this);
    this.handleGauss = this.handleGauss.bind(this);
  }
  async callAPI() {
    this.setState({ isCalculated: false });
    const url = "http://localhost:9000/slau";
    var data = this.state.tableRowData;
    console.log(data);
    fetch(url, {
      method: "POST",
      body: JSON.stringify({ table: data }),
      headers: { "Content-Type": "application/json" },
    })
      .then(function (res) {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(data);
        this.setState({
          apiData: data,
          isCalculated: true,
        });
      });
  }
  createMass(lv_rows) {
    var tableRowData = [];
    var headers = [];
    for (var i = 0; i < lv_rows; i++) {
      tableRowData[i] = [];
      for (var j = 0; j < lv_rows; j++) {
        headers[j] = "x^" + j;
        tableRowData[i][j] = 0;
      }
    }
    console.log(headers);
    return tableRowData;
  }
  handleCalculate() {
    this.callAPI();
  }
  GlavElem(k, mas, otv, M) {
    var i, j;
    var i_max = k;
    var j_max = k;
    var temp;

    //Ищем максимальный по модулю элемент
    for (i = k; i < M; i++) {
      for (j = k; j < M; j++) {
        if (Math.abs(mas[i_max][j_max]) < Math.abs(mas[i][j])) {
          i_max = i;
          j_max = j;
        }
      }
    }
    //Переставляем строки
    for (j = k; j < M + 1; j++) {
      temp = mas[k][j];
      mas[k][j] = mas[i_max][j];
      mas[i_max][j] = temp;
    }
    //Переставляем столбцы
    for (i = 0; i < M; i++) {
      temp = mas[i][k];
      mas[i][k] = mas[i][j_max];
      mas[i][j_max] = temp;
    }
    //Учитываем изменение порядка корней
    i = otv[k];
    otv[k] = otv[j_max];
    otv[j_max] = i;
  }

  gauss(tableRowData, rows) {
    var i, j, k;
    var M;
    M = rows;
    var otv = [];
    var x = [];
    var mas = [];
    var F = [];
    for (i = 0; i < rows; i++) {
      mas[i] = [];
      for ( j = 0; j < rows; j++) {
        mas[i][j] = 0;
      }
    }
    for (i = 0; i < M; i++) {
      F[i] = Math.random() * (1 - -1) + -1;
    }
    
    for (i = 0; i < M; i++) {
      for (j = 0; j < M; j++) {     
        console.log(mas)   
        console.log(tableRowData)
        mas[i][j] = tableRowData[i][j];
      }
      mas[i][M] = F[i];
    }

    for (i = 0; i < M; i++) {
      otv[i] = i;
    }
    for (k = 0; k < M; k++) {
      //На какой позиции должен стоять главный элемент
      this.GlavElem(k, mas, otv, M); //Установка главного элемента
      for (j = M; j >= k; j--) {
        mas[k][j] /= mas[k][k];
      }

      for (i = k + 1; i < M; i++) {
        for (j = M; j >= k; j--) {
          mas[i][j] -= mas[k][j] * mas[i][k];
        }
      }
    }
    //Обратный ход
    for (i = 0; i < M; i++) {
      x[i] = mas[i][M];
    }
    for (i = M - 2; i >= 0; i--) {
      for (j = i + 1; j < M; j++) {
        x[i] -= x[j] * mas[i][j];
      }
    }

    return x;
  }

  handleGauss() {
    var table = this.gauss(this.state.tableRowData, this.state.rows);
    this.setState((state, props) => ({
      gaussData: table,
    }));
  }
  handleGetRandomInt() {
    var table = this.getRandomInt();
    this.setState((state, props) => ({
      isRandom: true,
      tableRowData: table,
    }));
  }
  getRandomInt() {
    var n = this.state.rows;
    var tableRowData = this.state.tableRowData;
    console.log(this.state.tableRowData);
    for (var i = 0; i < n; i++) {
      for (var j = i; j < n; j++) {
        if (i === j) {
          tableRowData[i][j] = 0;
        } else {
          tableRowData[i][j] = Math.floor(Math.random() * Math.floor(100));
          tableRowData[j][i] = tableRowData[i][j];
        }
      }
    }
    return tableRowData;
  }

  handleRowsChange(lv_rows) {
    var table = this.createMass(lv_rows);
    this.setState({
      rows: lv_rows,
      tableRowData: table,
      apiData: [],
    });
  }
  async componentDidMount() {
    var table = this.createMass(this.state.rows);
    console.log(this.state.isRandom);
    this.setState({
      tableRowData: table,
    });
  }
  componentDidUpdate() {}
  render() {
    console.log(this.state.apiData);
    console.log(this.state.gaussData);
    return (
      <React.Fragment>
        <InputData
          rows={this.state.rows}
          onRowsChange={this.handleRowsChange}
          tableRowData={this.state.tableRowData}
          headers={this.state.headers}
          onClickGetRandom={this.handleGetRandomInt}
          onClickCalculate={this.handleCalculate}
          gaussData={this.state.gaussData}
          onClickGauss={this.handleGauss}         
          calculatedData={this.state.calculatedData}
          apiData={this.state.apiData}
          isCalculated={this.state.isCalculated}
        />
      </React.Fragment>
    );
  }
}
export default App;
