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
      headers: [],
      isRandom: false,
      apiResponse: "API not Connect"
    };
    this.handleRowsChange = this.handleRowsChange.bind(this);
    this.handleGetRandomInt = this.handleGetRandomInt.bind(this);
    this.handleCalculate = this.handleCalculate.bind(this);
  }
  async callAPI() {
    await fetch("http://localhost:9000/slau")
      .then((res) => res.text())
      .then((res) => this.setState({ apiResponse: res }));
      const url = 'http://localhost:9000/slau';
      
      const data = { username: 'example' };

      try {
        const response = await fetch(url, {
          method: 'POST', // или 'PUT'
          body: JSON.stringify(data), // данные могут быть 'строкой' или {объектом}!
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const json = await response.json();
        console.log('Успех:', JSON.stringify(json));
      } catch (error) {
        console.error('Ошибка:', error);
      }
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
  handleCalculate(tableRowData) {
    var M;
    var Xk = [];
    var Zk = [];
    var Rk = [];
    var Sz = [];
    var alpha, beta, mf;
    var Spr, Spr1, Spz;
    var F = [];
    var i, j;
    var max_iter = 100000;
    var E = 0.001;
    /* Вычисляем сумму квадратов элементов вектора F*/
    for (mf = 0, i = 0; i < M; i++) {
      mf += F[i] * F[i];
    }

    /* Задаем начальное приближение корней. В Хk хранятся значения корней
     * к-й итерации. */
    for (i = 0; i < M; i++) {
      Xk[i] = 0.2;
    }

    /* Задаем начальное значение r0 и z0. */
    for (i = 0; i < M; i++) {
      for (Sz[i] = 0, j = 0; j < M; j++) Sz[i] += tableRowData[i][j] * Xk[j];
      Rk[i] = F[i] - Sz[i];
      Zk[i] = Rk[i];
    }
    var Iteration = 0;
    do {
      Iteration++;
      /* Вычисляем числитель и знаменатель для коэффициента
       * alpha = (rk-1,rk-1)/(Azk-1,zk-1) */
      Spz = 0;
      Spr = 0;
      for (i = 0; i < M; i++) {
        for (Sz[i] = 0, j = 0; j < M; j++) {
          Sz[i] += tableRowData[i][j] * Zk[j];
        }
        Spz += Sz[i] * Zk[i];
        Spr += Rk[i] * Rk[i];
      }
      alpha = Spr / Spz; /*  alpha    */
      Spr1 = 0;
      for (i = 0; i < M; i++) {
        Xk[i] += alpha * Zk[i];
        Rk[i] -= alpha * Sz[i];
        Spr1 += Rk[i] * Rk[i];
      }
      /* Вычисляем  beta  */
      beta = Spr1 / Spr;

      /* Вычисляем вектор спуска: zk = rk+ beta * zk-1 */
      for (i = 0; i < M; i++) Zk[i] = Rk[i] + beta * Zk[i];
    } while (
      /* Проверяем условие выхода из итерационного цикла  */
      Spr1 / mf > E * E &&
      Iteration < max_iter
    );

    return 0;
  }

  handleGetRandomInt() {
    var table = this.getRandomInt()
    this.setState((state, props) => ({
      isRandom: true,
      tableRowData: table
    }));
  }
  getRandomInt(){
    var n = this.state.rows;
    var tableRowData = this.state.tableRowData;
    console.log(this.state.tableRowData);
    for (var i = 0; i < n; i++) {
      for (var j = i; j < n; j++) {
        if (i === j) {
          tableRowData[i][j] = 0;
        } else {
          tableRowData[i][j] = Math.floor(
            Math.random() * Math.floor(100)           
          );
          tableRowData[j][i] = tableRowData[i][j]
        }
      }
    }
    return tableRowData;
  }

  handleRowsChange(lv_rows) {
    var table = this.createMass(lv_rows);
    this.setState({
      rows: lv_rows,
      tableRowData: table
    });
    console.log(this.state.rows);
  }
  async componentDidMount() {
    var table = this.createMass(this.state.rows);
    console.log(this.state.isRandom)
    this.setState({
      tableRowData: table
    });
    this.callAPI();
  }
  componentDidUpdate(){
    console.log(this.state.isRandom)
    if(this.state.isRandom === true){
      this.getRandomInt()
    }
  }
  render() {
    return (
      <React.Fragment>
        <InputData
          rows={this.state.rows}
          onRowsChange={this.handleRowsChange}
          tableRowData={this.state.tableRowData}
          headers={this.state.headers}
          onClickGetRandom={this.handleGetRandomInt}
          onClickCalculate={this.handleCalculate}
          apiResponse = {this.state.apiResponse}
        />
      </React.Fragment>
    );
  }
}
export default App;
