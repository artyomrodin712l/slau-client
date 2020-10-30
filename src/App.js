import React, { Component } from "react";
import "./App.css";
import InputData from "./InputData";

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      rows: 2,
      columns: 2,
      tableRowData: [],
      headers: [],
      isRandom: false,
    };
    this.handleRowsChange = this.handleRowsChange.bind(this);
    this.handleColumnsChange = this.handleColumnsChange.bind(this);
    this.handleGetRandomInt = this.handleGetRandomInt.bind(this);
    this.handleCalculate = this.handleCalculate.bind(this);
  }

  createMass(n, m) {
    var tableRowData = [];
    var headers = [];
    for (var i = 0; i < n; i++) {
      tableRowData[i] = [];
      for (var j = 0; j < m; j++) {
        headers[j] = "x^" + j;
        tableRowData[i][j] = 0;
      }
    }
    console.log(headers);
    this.setState({
      tableRowData: tableRowData,
      headers: headers,
    });
  }
  handleCalculate() {
    var M;
    var Xk = [];
    var Zk = [];
    var Rk = [];
    var Sz = [];
    var alpha, beta, mf;
    var Spr, Spr1, Spz;
    var A = [];
    var F = [];
    var i,
      j,
      kl = 1;
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
      for (Sz[i] = 0, j = 0; j < M; j++) Sz[i] += A[i][j] * Xk[j];
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
          Sz[i] += A[i][j] * Zk[j];
        }
        Spz += Sz[i] * Zk[i];
        Spr += Rk[i] * Rk[i];
      }
      alpha = Spr / Spz; /*  alpha    */

      /* Вычисляем вектор решения: xk = xk-1+ alpha * zk-1, 
   вектор невязки: rk = rk-1 - alpha * A * zk-1 и числитель для betaa равный (rk,rk) */
      Spr1 = 0;
      for (i = 0; i < M; i++) {
        Xk[i] += alpha * Zk[i];
        Rk[i] -= alpha * Sz[i];
        Spr1 += Rk[i] * Rk[i];
        //cout << "Iter #" << kl;
        //cout << " " << "X[" << i << "] = " << Xk[i] << endl;
      }
      //cout << endl;
      kl++;

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
    var n = this.state.rows;
    var m = this.state.columns;
    var tableRowData = [];
    for (var i = 0; i < n; i++) {
      tableRowData[i] = [];
      for (var j = 0; j < m; j++) {
        tableRowData[i][j] = Math.floor(Math.random() * Math.floor(100));
      }
    }
    this.setState({
      tableRowData: tableRowData,
      isRandom: true,
    });
    console.log(tableRowData);
    console.log(this.state.isRandom);
    console.log(this.state.tableRowData);
  }

  handleRowsChange(rows) {
    this.setState({
      rows: rows,
    });
    console.log(this.state.rows);
    this.createMass(this.state.rows, this.state.columns);
  }

  handleColumnsChange(columns) {
    this.setState({
      columns: columns,
    });
    console.log(this.state.columns);
    this.createMass(this.state.rows, this.state.columns);
  }
  componentDidUpdate() {
    console.log(this.state.isRandom);
    if (this.state.isRandom === false) {
      this.createMass(this.state.rows, this.state.columns);
    }
  }
  render() {
    return (
      <React.Fragment>
        <InputData
          rows={this.state.rows}
          columns={this.state.columns}
          onRowsChange={this.handleRowsChange}
          onColumnsChange={this.handleColumnsChange}
          tableRowData={this.state.tableRowData}
          headers={this.state.headers}
          onClickGetRandom={this.handleGetRandomInt}
          onClickCalculate={this.handleCalculate}
        />
      </React.Fragment>
    );
  }
}
export default App;
