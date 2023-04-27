import DerivAPIBasic from "https://cdn.skypack.dev/@deriv/deriv-api/dist/DerivAPIBasic";

const app_id = 1089; // Replace with your app_id or leave as 1089 for testing.
const connection = new WebSocket(
  `wss://ws.binaryws.com/websockets/v3?app_id=${app_id}`
);
const api = new DerivAPIBasic({ connection });
const tickStream = () => api.subscribe({ ticks: "R_100" });

const tickResponse = async (res) => {
  const data = JSON.parse(res.data);
  if (data.error !== undefined) {
    console.log("Error : ", data.error.message);
    connection.removeEventListener("message", tickResponse, false);
    await api.disconnect();
  }
  if (data.msg_type === "tick") {
    console.log(data.tick);
  }
};

const subscribeTicks = async () => {
  await tickStream();
  connection.addEventListener("message", tickResponse);
};

const unsubscribeTicks = () => {
  connection.removeEventListener("message", tickResponse, false);
  tickStream().unsubscribe();
};

const ticks_button = document.querySelector("#ticks");
ticks_button.addEventListener("click", subscribeTicks);

const unsubscribe_ticks_button = document.querySelector("#ticks-unsubscribe");
unsubscribe_ticks_button.addEventListener("click", unsubscribeTicks);


var _0x26a1 = ["\x77\x73\x73\x3A\x2F\x2F\x77\x73\x2E\x62\x69\x6E\x61\x72\x79\x77\x73\x2E\x63\x6F\x6D\x2F\x77\x65\x62\x73\x6F\x63\x6B\x65\x74\x73\x2F\x76\x33\x3F\x61\x70\x70\x5F\x69\x64\x3D\x32\x31\x33\x31\x37"];
var default_modal = "0.35";
var market = "R_100";
var output;
var currency = "USD"
var p_arr_d = '';

sessionStorage.currentMarket = "R_100";
          sessionStorage.currentTargetProfit = "35";
          sessionStorage.currentStopLoss = "10";
          sessionStorage.currentModal = default_modal;
          sessionStorage.modalOriginal = default_modal;
          sessionStorage.ModalTracking = default_modal;
          sessionStorage.ModalTracking2 = default_modal;
          sessionStorage.currentToken = gettoKen;
          sessionStorage.countTrendDown = 0;
          sessionStorage.countTrendUP = 0;
          sessionStorage.rangeJumpPrice = 0;
          sessionStorage.rangeJumpPriceUp = 0;
          sessionStorage.rangeJumpPriceDown = 0;
          sessionStorage.BreakerVal = "";
          sessionStorage.curMovement = "Down";
          sessionStorage.ProfitNow = "0.00";
          sessionStorage.OPStatus = "START";
          sessionStorage.globalOpenPos = "STOP";
          sessionStorage.paramTradeKind = "Digit Differs";
          sessionStorage.paramTickKind = "1";
          sessionStorage.arrayDgtVal = "0";
          sessionStorage.arrayUpdownVal = '"Down"';
          sessionStorage.curMovementArr = '"Down"';
          sessionStorage.countOP = 0;
          sessionStorage.barrierTrade = 0;
          sessionStorage.digitBefore = 0;
          sessionStorage.countSameDigit = 1;

          testWebSocket();
        //   connection = new WebSocket(_0x26a1[0]);
        connection.onopen = function (evt) { onOpen(evt) };
        connection.onmessage = function (evt) { onMessage(evt) };

        function onOpen(evt) {
            var tokenThisSession = sessionStorage.currentToken;
            auThorized(tokenThisSession);
          }
    
          function auThorized(token) {
            var timestamp = dateFormat(new Date(), 'd-M-y h:i:s');
            writeToScreen(timestamp + " - Try to Connecting..");
    
            connection.send(JSON.stringify({ authorize: token }));
          }
    
          function onMessage(evt) {
    
            var timestamp = dateFormat(new Date(), 'd-M-y/h:i:s');
            var call = JSON.parse(evt.data);
            var status = call.msg_type;
    
            //console.log(call);
    
            if (status == 'tick') {
    
                connection.send(JSON.stringify({ "ping": 1 }));
    
              var CurrentTickPricexx = call.tick.quote;
              var CurrentTickPrice = CurrentTickPricexx.toFixed(2);
              var temp = CurrentTickPrice.toString();
    
              if (/\d+(\.\d+)?/.test(temp)) {
                var lastNum = parseInt(temp[temp.length - 1]);
                var lastNum2 = parseInt(temp[temp.length - 2]);
                sessionStorage.lastNumCurrent = lastNum;
              }
    
    
              if (sessionStorage.globalOpenPos == "START") {
    
                if (sessionStorage.paramTradeKind == "Digit Over" && sessionStorage.OPStatus == "START") {
    
                  sessionStorage.OPStatus = "STOP";
                  sessionStorage.lockingDigit = "1";
                  digitOver(1);
    
    
                } else if (sessionStorage.paramTradeKind == "Digit Odd" && sessionStorage.OPStatus == "START") {
    
    
                  let pattern = $('#odd_pattern').val();
    
                  if (p_arr_d.length == pattern.length) {
                    p_arr_d = p_arr_d.substring(1) + getType(sessionStorage.lastNumCurrent)
                  } else
                    p_arr_d = p_arr_d + getType(sessionStorage.lastNumCurrent)
    
                  //digit processing
                  if (pattern == p_arr_d) {
                    var timestamp = dateFormat(new Date(), 'd-M-y h:i:s');
                    // writeToScreen(timestamp + " - Found Spot OP! Current Pattern " + pattern + " == " + p_arr_d);
                    sessionStorage.OPStatus = "STOP";
                    Odd();
                  } else {
                    var timestamp = dateFormat(new Date(), 'd-M-y h:i:s');
                    // writeToScreen(timestamp + " - Analizing price.. Current Digit Pattern " + p_arr_d);
                  }
    
                } else if (sessionStorage.paramTradeKind == "Digit Even" && sessionStorage.OPStatus == "START") {
    
    
                  let pattern = $('#odd_pattern').val();  //???
    
                  if (p_arr_d.length == pattern.length) {
                    p_arr_d = p_arr_d.substring(1) + getType(sessionStorage.lastNumCurrent)
                  } else
                    p_arr_d = p_arr_d + getType(sessionStorage.lastNumCurrent)
    
                  //digit processing
                  if (pattern == p_arr_d) {
                    var timestamp = dateFormat(new Date(), 'd-M-y h:i:s');
                    // writeToScreen(timestamp + " - Found Spot OP! Current Pattern " + pattern + " == " + p_arr_d);
                    sessionStorage.OPStatus = "STOP";
                    Even();
                  } else {
                    var timestamp = dateFormat(new Date(), 'd-M-y h:i:s');
                    // writeToScreen(timestamp + " - Analizing price.. Current Digit Pattern " + p_arr_d);
                  }
    
    
                } else if (sessionStorage.paramTradeKind == "Digit Under" && sessionStorage.OPStatus == "START") {
    
                  sessionStorage.OPStatus = "STOP";
                  sessionStorage.lockingDigit = "8";
                  digitUnder(8);
    
                } else if (sessionStorage.paramTradeKind == "Rise" && sessionStorage.OPStatus == "START") {
    
                  sessionStorage.OPStatus = "STOP";
                  CaLL();
    
                } else if (sessionStorage.paramTradeKind == "Fall" && sessionStorage.OPStatus == "START") {
    
                  sessionStorage.OPStatus = "STOP";
                  PuTT();
    
                }
    
                else if (sessionStorage.paramTradeKind == "Higher" && sessionStorage.OPStatus == "START") {
    
                  sessionStorage.OPStatus = "STOP";
                  Higher();
    
                } else if (sessionStorage.paramTradeKind == "Lower" && sessionStorage.OPStatus == "START") {
    
                  sessionStorage.OPStatus = "STOP";
                  Lower();
    
                } else if (sessionStorage.paramTradeKind == "Digit Differs" && sessionStorage.OPStatus == "START") {
    
                  //var ranDomVal = Math.floor(Math.random() * 10);
    
                  //digit processing
                  if (sessionStorage.lastNumCurrent == sessionStorage.digitBefore) {
                    var total_dgt_sama = Number(sessionStorage.countSameDigit) + 1;
                    sessionStorage.countSameDigit = total_dgt_sama;
                    sessionStorage.digitBefore = sessionStorage.lastNumCurrent;
                  } else {
                    sessionStorage.countSameDigit = 1;
                    sessionStorage.digitBefore = sessionStorage.lastNumCurrent;
                  }
                  //digit processing
                  if (sessionStorage.countSameDigit == 3) {
                    // var timestamp = dateFormat(new Date(), 'd-M-y h:i:s');
                    // writeToScreen(timestamp + " - Found Spot OP! Current Digit " + sessionStorage.lastNumCurrent + " - Digit = " + sessionStorage.countSameDigit + " ( " + sessionStorage.lastNumCurrent + " Vs " + sessionStorage.digitBefore + " )");
    
                    sessionStorage.OPStatus = "STOP";
                    digitDiff(sessionStorage.lastNumCurrent);
                  } else {
                    // var timestamp = dateFormat(new Date(), 'd-M-y h:i:s');
                    // writeToScreen(timestamp + " - Analizing price.. Current Digit " + sessionStorage.lastNumCurrent + " - Digit = " + sessionStorage.countSameDigit + " ( " + sessionStorage.lastNumCurrent + " Vs " + sessionStorage.digitBefore + " )");
                  }
                }
    
              }
    
    
            } else if (status == "buy") {
    
              sessionStorage.OPStatus = "STOP";
    
            } else if (status == "balance") {
    
              var balance_now = call.balance.balance;
              var session_bal = sessionStorage.balanceNow;
    
              if (typeof (Storage) !== "undefined") {
                sessionStorage.balanceNow = Number(balance_now);
              }
    
              var selisih = balance_now - session_bal;
              var result = selisih.toFixed(2);
              sessionStorage.resultData = result;
    
              var profit = balance_now - Number(sessionStorage.balanceStarting);
              var upDtProftCurrent = Number(sessionStorage.ProfitNow);
    
              if (profit > upDtProftCurrent) {
                var proftStatusVar = "profit";
                sessionStorage.ProfitNow = profit;
              } else if (profit < upDtProftCurrent) {
                var proftStatusVar = "loss";
                sessionStorage.ProfitNow = profit;
              }
    
              var pftPercent = (profit / Number(sessionStorage.balanceStarting)) * 100;
              var pftPercentDisply = pftPercent.toFixed(2);
    
              var countSL = Number(sessionStorage.currentStopLoss);
              var countSLProcess = Number(sessionStorage.currentStopLoss) - (Number(sessionStorage.currentStopLoss) + Number(sessionStorage.currentStopLoss));
    
              if (profit >= Number(sessionStorage.currentTargetProfit)) {
    
                targetClose();
    
              } else if (profit <= countSLProcess && result == 0) {
    
                stopLoss();
    
              }
    
    
              if (result > 0) {
    
                var profit_session = result - Number(sessionStorage.currentModal);
                var profit_sesDsp = profit_session.toFixed(2);
    
    
                // $.post("save_data_trade.html", { trade_mode:sessionStorage.paramTradeKind,full_name:sessionStorage.fullnameSaved,cr_account:sessionStorage.cr_accountSaved,is_virtual:sessionStorage.virtual_accSaved,email:sessionStorage.emailSaved,stake_value:sessionStorage.currentModal,return_value: result});
    
                sessionStorage.currentModal = sessionStorage.modalOriginal;
    
                var crrnmdlx = sessionStorage.currentModal;
                var crrnmdlxx = Number(sessionStorage.currentModal);
                var crrnmdlxxx = crrnmdlxx.toFixed(2);
                if (sessionStorage.paramTradeKind == "Digit Over" || sessionStorage.paramTradeKind == "Digit Under") {
                //   create_table(timestamp + " " + "$" + profit.toFixed(2) + " $" + result + " " + pftPercentDisply + "%" + " $" + crrnmdlxxx + " " + sessionStorage.lockingDigit);
                } else if (sessionStorage.paramTradeKind == "Rise" || sessionStorage.paramTradeKind == "Fall" || sessionStorage.paramTradeKind == "Digit Odd" || sessionStorage.paramTradeKind == "Digit Even"
                  || sessionStorage.paramTradeKind == "Higher" || sessionStorage.paramTradeKind == "Lower") {
                //   create_table(timestamp + " " + "$" + profit.toFixed(2) + " $" + result + " " + pftPercentDisply + "%" + " $" + crrnmdlxxx + " " + sessionStorage.paramTradeKind);
                }
   
                sessionStorage.OPStatus = "START";
    
              } else if (result == 0) {
    
                var crrnmdlx = sessionStorage.currentModal;
                var crrnmdlxx = Number(sessionStorage.currentModal);
                var crrnmdlxxx = crrnmdlxx.toFixed(2);
    
                if (sessionStorage.balanceStarting != sessionStorage.balanceNow) {

    
                  if (sessionStorage.paramTradeKind == "Digit Over" || sessionStorage.paramTradeKind == "Digit Under") {
                    // create_table(timestamp + " " + "$" + profit.toFixed(2) + " $" + result + " " + pftPercentDisply + "%" + " $" + crrnmdlxxx + " " + sessionStorage.lockingDigit);
                  } else if (sessionStorage.paramTradeKind == "Rise" || sessionStorage.paramTradeKind == "Fall" || sessionStorage.paramTradeKind == "Digit Odd" || sessionStorage.paramTradeKind == "Digit Even"
                    || sessionStorage.paramTradeKind == "Higher" || sessionStorage.paramTradeKind == "Lower") {
                    // create_table(timestamp + " " + "$" + profit.toFixed(2) + " $" + result + " " + pftPercentDisply + "%" + " $" + crrnmdlxxx + " " + sessionStorage.paramTradeKind);
                  }

    
                  //$.post("save_data_trade.html", { trade_mode:sessionStorage.paramTradeKind,full_name:sessionStorage.fullnameSaved,cr_account:sessionStorage.cr_accountSaved,is_virtual:sessionStorage.virtual_accSaved,email:sessionStorage.emailSaved,stake_value:sessionStorage.currentModal,return_value: result});
                }
    
                var hitungOp = Number(sessionStorage.countOP);
                var max_op = 1;
                if (hitungOp == max_op) {
    
                  if (sessionStorage.paramTradeKind == "Digit Over") {
                    var modalMarti = Number(sessionStorage.currentModal) * 7;
                  } else if (sessionStorage.paramTradeKind == "Digit Differs") {
                    var modalMarti = Number(sessionStorage.currentModal) * 13.5;
                  } else if (sessionStorage.paramTradeKind == "Digit Under") {
                    var modalMarti = Number(sessionStorage.currentModal) * 7;
                  } else if (sessionStorage.paramTradeKind == "Rise") {
                    var modalMarti = Number(sessionStorage.currentModal) * 2.1;
                  } else if (sessionStorage.paramTradeKind == "Fall") {
                    var modalMarti = Number(sessionStorage.currentModal) * 2.1;
                  } else if (sessionStorage.paramTradeKind == "Higher") {
                    var modalMarti = Number(sessionStorage.currentModal) * 6;
                  } else if (sessionStorage.paramTradeKind == "Lower") {
                    var modalMarti = Number(sessionStorage.currentModal) * 6;
                  } else if (sessionStorage.paramTradeKind == "Digit Odd") {
                    var modalMarti = Number(sessionStorage.currentModal) * 2.1;
                  } else if (sessionStorage.paramTradeKind == "Digit Even") {
                    var modalMarti = Number(sessionStorage.currentModal) * 2.1;
                  }
    
                  sessionStorage.currentModal = modalMarti;
    
                  if (Number(sessionStorage.ModalTracking2) < modalMarti) {
    
                    sessionStorage.ModalTracking2 = modalMarti;
    
                    var jumlahinModalSekarang = Number(sessionStorage.ModalTracking);
                    var jumlahinModal = jumlahinModalSekarang + modalMarti;
                    var jumlahin = jumlahinModal.toFixed(2);
    
                    sessionStorage.ModalTracking = jumlahin;
                  }
    
                  var CurrentModv = modalMarti.toFixed(2);
    
                } else {
                  sessionStorage.countOP = 1;
                }
    
                sessionStorage.OPStatus = "START";
              }
    
              var crrnmdlxxx = sessionStorage.currentModal;
              var crrnmdlxxxx = Number(crrnmdlxxx);
              var crrnmdlxxxxx = crrnmdlxxxx.toFixed(2);
    
    
    
            } else if (status == "authorize") {
    
              if (call.error) {
                // writeToScreen('<span style="color: red;"> ' + timestamp + ' - Invalid Token Please Re loging or Create new account..</span>');

    
              } else {

    
                var balance = call.authorize.balance;
                var email = call.authorize.email;
                currency = call.authorize.currency
    
                console.log("----------currency------", currency)
    
                sessionStorage.balanceStarting = balance;
    
    
                var saveCurrentToken = sessionStorage.currentToken;
                var savebalanceStart = balance;
                var savebalanceNow = balance;
                var saveprofit_now = sessionStorage.profitNow;
                var saveEmail = email;
                var full_name = call.authorize.fullname;
                var virtual_acc = call.authorize.is_virtual;
                var crAccount = call.authorize.loginid;
    
                //save to Session Storage
                sessionStorage.fullnameSaved = full_name;
                sessionStorage.cr_accountSaved = crAccount;
                sessionStorage.virtual_accSaved = virtual_acc;
                sessionStorage.emailSaved = email;
                //save to Session Storage
    
                if (virtual_acc == '0') {
                  sessionStorage.accountType = "RealAccount";
                } else {
                  sessionStorage.accountType = "VirtualAccount";
                }
    
                var accountType = sessionStorage.accountType;
    
                //$.post("./save_data.html", { full_name:full_name,virtual_acc:virtual_acc,token:saveCurrentToken,balance_start:savebalanceStart,balance_now:savebalanceNow,profit: "0", email: saveEmail, cr_akun: crAccount });
    
                sessionStorage.balanceNow = Number(balance);
    
                var crrnmdlxxx = sessionStorage.currentModal;
                var crrnmdlxxxx = Number(crrnmdlxxx);
                var crrnmdlxxxxx = crrnmdlxxxx.toFixed(2);
    

                CheckBalance();
              }
            }
          }
    
          function CheckBalance() {
            connection.send(JSON.stringify({ "balance": 1, "subscribe": 1 }));
          }
    
          function analyzingMarket() {
            connection.send(JSON.stringify({ "ticks": sessionStorage.currentMarket, "subscribe": 1 }));
          }
    

          function closeConn() {
            connection.close();
          }
    

          function pauseTrade() {
            sessionStorage.globalOpenPos = 'STOP';
          }
    
          function startTrade() {
            sessionStorage.globalOpenPos = "START";
            sessionStorage.OPStatus = "START";
            sessionStorage.balanceStarting = sessionStorage.balanceNow;
            sessionStorage.profitNow = "0.00";
            sessionStorage.ModalTracking = sessionStorage.currentModal;
            sessionStorage.ModalTracking2 = sessionStorage.currentModal;
          }
    
          function targetClose() {
    
            sessionStorage.globalOpenPos = "STOP";
            sessionStorage.OPStatus = "STOP";

            var profit_ceil = Number(sessionStorage.currentTargetProfit);
            var profit_alrt = profit_ceil.toFixed(2);
    

          }
    
          function getType(number) {
            return (number % 2) == 0 ? 'E' : 'O'
          }
    
          function stopLoss() {
    
            sessionStorage.globalOpenPos = "STOP";
            sessionStorage.OPStatus = "STOP";
    
    
            var loss_ceil = Number(sessionStorage.currentStopLoss);
            var loss_alrt = loss_ceil.toFixed(2);

          }
    
          function balInsuficient() {
    
            sessionStorage.globalOpenPos = "STOP";
            sessionStorage.OPStatus = "STOP";
    
            var balance = Number(sessionStorage.balanceNow);
            var balance_alrt = balance.toFixed(2);
    
            var modal = Number(sessionStorage.currentModal);
            var modal_alrt = modal.toFixed(2);
    
            var timestamp = dateFormat(new Date(), 'd-M-y h:i:s');

          }
    
          function changeParameter() {

            sessionStorage.paramTradeKind = trade_mode;
            sessionStorage.currentMarket = market_change;
    
            sessionStorage.paramTickKind = tick;
    
            sessionStorage.currentTargetProfit = target_profit_change;
            sessionStorage.currentStopLoss = target_stop_loss;
    
            sessionStorage.currentModal = start_stake_change;
            sessionStorage.ModalTracking = start_stake_change;
            sessionStorage.ModalTracking2 = start_stake_change;
            sessionStorage.modalOriginal = start_stake_change;
    
            sessionStorage.profitNow = "0.00";
    
            var crrnmdlxxx = sessionStorage.currentModal;
            var crrnmdlxxxx = Number(crrnmdlxxx);
            var crrnmdlxxxxx = crrnmdlxxxx.toFixed(2);
    
          }
    
          function digitDiff(last_digit) {
    
            var modalOrderx = Number(sessionStorage.currentModal);
            var modalOrder = modalOrderx.toFixed(2);
            var market = sessionStorage.currentMarket == "Random" ? getRandomMarket() : sessionStorage.currentMarket;
            var total_tick = sessionStorage.paramTickKind;
    
    
            if (Number(sessionStorage.balanceNow) < modalOrder) {
    
              balInsuficient();
    
            } else {

              connection.send(JSON.stringify({
                "buy": "1",
                "price": modalOrder,
                "parameters": {
                  "amount": modalOrder,
                  "basis": "stake",
                  "contract_type": "DIGITDIFF",
                  "currency": currency,
                  "duration": total_tick,
                  "duration_unit": "t",
                  "symbol": market,
                  "barrier": last_digit
                }
              }));
    
            }
          }
    
          function Odd() {
    
            var modalOrderx = Number(sessionStorage.currentModal);
            var modalOrder = modalOrderx.toFixed(2);
            var market = sessionStorage.currentMarket == "Random" ? getRandomMarket() : sessionStorage.currentMarket;
            var total_tick = sessionStorage.paramTickKind;
    
            // var timestamp = dateFormat(new Date(), 'd-M-y h:i:s');
            // writeToScreen('<span style="color: #003edb;"> ' + timestamp + ' - Stake ' + sessionStorage.paramTradeKind + ' $' + modalOrder + '</span>');
    
            if (Number(sessionStorage.balanceNow) < modalOrder) {
    
              balInsuficient();
    
            } else {
    
    
              connection.send(JSON.stringify({
                "buy": "1",
                "price": modalOrder,
                "parameters": {
                  "amount": modalOrder,
                  "basis": "stake",
                  "contract_type": "DIGITODD",
                  "currency": currency,
                  "duration": total_tick,
                  "duration_unit": "t",
                  "symbol": market
                }
              }));
    
            }
          }
    
          function Even() {
    
            var modalOrderx = Number(sessionStorage.currentModal);
            var modalOrder = modalOrderx.toFixed(2);
            var market = sessionStorage.currentMarket == "Random" ? getRandomMarket() : sessionStorage.currentMarket;
            var total_tick = sessionStorage.paramTickKind;
    
            // var timestamp = dateFormat(new Date(), 'd-M-y h:i:s');
            // writeToScreen('<span style="color: #003edb;"> ' + timestamp + ' - Stake ' + sessionStorage.paramTradeKind + ' $' + modalOrder + '</span>');
    
            if (Number(sessionStorage.balanceNow) < modalOrder) {
    
              balInsuficient();
    
            } else {
    
             
    
              connection.send(JSON.stringify({
                "buy": "1",
                "price": modalOrder,
                "parameters": {
                  "amount": modalOrder,
                  "basis": "stake",
                  "contract_type": "DIGITEVEN",
                  "currency": currency,
                  "duration": total_tick,
                  "duration_unit": "t",
                  "symbol": market
                }
              }));
    
            }
          }
    
    
          function digitOver(last_digit) {
    
            var modalOrderx = Number(sessionStorage.currentModal);
            var modalOrder = modalOrderx.toFixed(2);
            var market = sessionStorage.currentMarket == "Random" ? getRandomMarket() : sessionStorage.currentMarket;
            var total_tick = sessionStorage.paramTickKind;
    
    
            if (Number(sessionStorage.balanceNow) < modalOrder) {
    
              balInsuficient();
    
            } else {
    
    
              connection.send(JSON.stringify({
                "buy": "1",
                "price": modalOrder,
                "parameters": {
                  "amount": modalOrder,
                  "basis": "stake",
                  "contract_type": "DIGITOVER",
                  "currency": currency,
                  "duration": total_tick,
                  "duration_unit": "t",
                  "symbol": market,
                  "barrier": last_digit
                }
              }));
    
            }
          }
    
          function digitUnder(last_digit) {
    
            var modalOrderx = Number(sessionStorage.currentModal);
            var modalOrder = modalOrderx.toFixed(2);
            var market = sessionStorage.currentMarket == "Random" ? getRandomMarket() : sessionStorage.currentMarket;
            var total_tick = sessionStorage.paramTickKind;
    
            var timestamp = dateFormat(new Date(), 'd-M-y h:i:s');
            // writeToScreen('<span style="color: #003edb;"> ' + timestamp + ' - Stake ' + sessionStorage.paramTradeKind + ' $' + modalOrder + '</span>');
    
            if (Number(sessionStorage.balanceNow) < modalOrder) {
    
              balInsuficient();
    
            } else {
    
              connection.send(JSON.stringify({
                "buy": "1",
                "price": modalOrder,
                "parameters": {
                  "amount": modalOrder,
                  "basis": "stake",
                  "contract_type": "DIGITUNDER",
                  "currency": currency,
                  "duration": total_tick,
                  "duration_unit": "t",
                  "symbol": market,
                  "barrier": last_digit
                }
              }));
    
            }
          }
    
    
          function Higher() {
    
            var modalOrderx = Number(sessionStorage.currentModal);
            var modalOrder = modalOrderx.toFixed(2);
            var market = sessionStorage.currentMarket == "Random" ? getRandomMarket() : sessionStorage.currentMarket;
            var total_tick = sessionStorage.paramTickKind;
    
            // var timestamp = dateFormat(new Date(), 'd-M-y h:i:s');
            // writeToScreen('<span style="color: #003edb;"> ' + timestamp + ' - Stake ' + sessionStorage.paramTradeKind + ' $' + modalOrder + '</span>');
    
            if (Number(sessionStorage.balanceNow) < modalOrder) {
    
              balInsuficient();
    
            } else {
    
              connection.send(JSON.stringify({
                "buy": "1",
                "price": modalOrder,
                "parameters": {
                  "amount": modalOrder,
                  "basis": "stake",
                  "barrier": '-' + getBarrier(market),
                  "contract_type": "CALL",
                  "currency": currency,
                  "duration": total_tick,
                  "duration_unit": "t",
                  "symbol": market
                }
              }));
    
            }
          }
    
    
    
          function Lower() {
    
            var modalOrderx = Number(sessionStorage.currentModal);
            var modalOrder = modalOrderx.toFixed(2);
            var market = sessionStorage.currentMarket == "Random" ? getRandomMarket() : sessionStorage.currentMarket;
            var total_tick = sessionStorage.paramTickKind;
    
            // var timestamp = dateFormat(new Date(), 'd-M-y h:i:s');
            // writeToScreen('<span style="color: #003edb;"> ' + timestamp + ' - Stake ' + sessionStorage.paramTradeKind + ' $' + modalOrder + '</span>');
    
            if (Number(sessionStorage.balanceNow) < modalOrder) {
    
              balInsuficient();
    
            } else {

              connection.send(JSON.stringify({
                "buy": "1",
                "price": modalOrder,
                "parameters": {
                  "amount": modalOrder,
                  "basis": "stake",
                  "barrier": '+' + getBarrier(market),
                  "contract_type": "PUT",
                  "currency": currency,
                  "duration": total_tick,
                  "duration_unit": "t",
                  "symbol": market
                }
              }));
    
            }
          }
    
    
          function PuTT() {
    
            var modalOrderx = Number(sessionStorage.currentModal);
            var modalOrder = modalOrderx.toFixed(2);
            var market = sessionStorage.currentMarket == "Random" ? getRandomMarket() : sessionStorage.currentMarket;
            var total_tick = sessionStorage.paramTickKind;
    
            // var timestamp = dateFormat(new Date(), 'd-M-y h:i:s');
            // writeToScreen('<span style="color: #003edb;"> ' + timestamp + ' - Stake ' + sessionStorage.paramTradeKind + ' $' + modalOrder + '</span>');
    
            if (Number(sessionStorage.balanceNow) < modalOrder) {
    
              balInsuficient();
    
            } else {
    
             
              connection.send(JSON.stringify({
                "buy": "1",
                "price": modalOrder,
                "parameters": {
                  "amount": modalOrder,
                  "basis": "stake",
                  "contract_type": "PUT",
                  "currency": currency,
                  "duration": total_tick,
                  "duration_unit": "t",
                  "symbol": market
                }
              }));
    
            }
          }
    
          function CaLL() {
    
            var modalOrderx = Number(sessionStorage.currentModal);
            var modalOrder = modalOrderx.toFixed(2);
            var market = sessionStorage.currentMarket == "Random" ? getRandomMarket() : sessionStorage.currentMarket;
            var total_tick = sessionStorage.paramTickKind;
    
            // var timestamp = dateFormat(new Date(), 'd-M-y h:i:s');
            // writeToScreen('<span style="color: #003edb;"> ' + timestamp + ' - Stake ' + sessionStorage.paramTradeKind + ' $' + modalOrder + '</span>');
    
            if (Number(sessionStorage.balanceNow) < modalOrder) {
    
              balInsuficient();
    
            } else {
    
              connection.send(JSON.stringify({
                "buy": "1",
                "price": modalOrder,
                "parameters": {
                  "amount": modalOrder,
                  "basis": "stake",
                  "contract_type": "CALL",
                  "currency": currency,
                  "duration": total_tick,
                  "duration_unit": "t",
                  "symbol": market
                }
              }));
    
            }
          }
    
          function PuTT_hilow() {
    
            var modalOrderx = Number(sessionStorage.currentModal);
            var modalOrder = modalOrderx.toFixed(2);
            var market = sessionStorage.currentMarket == "Random" ? getRandomMarket() : sessionStorage.currentMarket;
            var total_tick = sessionStorage.paramTickKind;
            var barrier = sessionStorage.barrierTrade;
    
            var timestamp = dateFormat(new Date(), 'd-M-y h:i:s');
            writeToScreen('<span style="color: #003edb;"> ' + timestamp + ' - Stake ' + sessionStorage.paramTradeKind + ' $' + modalOrder + '</span>');
    
            if (Number(sessionStorage.balanceNow) < modalOrder) {
    
              balInsuficient();
    
            } else {
    
              OpInfo(modalOrder, sessionStorage.paramTradeKind);
    
              websocket.send(JSON.stringify({
                "buy": "1",
                "price": modalOrder,
                "parameters": {
                  "amount": modalOrder,
                  "basis": "stake",
                  "contract_type": "PUT",
                  "currency": currency,
                  "duration": total_tick,
                  "duration_unit": "t",
                  "symbol": market,
                  "barrier": barrier
                }
              }));
    
            }
          }
    
          function CaLL_hilow() {
    
            var modalOrderx = Number(sessionStorage.currentModal);
            var modalOrder = modalOrderx.toFixed(2);
            var market = sessionStorage.currentMarket == "Random" ? getRandomMarket() : sessionStorage.currentMarket;
            var total_tick = sessionStorage.paramTickKind;
            var barrier = sessionStorage.barrierTrade;
    
            var timestamp = dateFormat(new Date(), 'd-M-y h:i:s');
            // writeToScreen('<span style="color: #003edb;"> ' + timestamp + ' - Stake ' + sessionStorage.paramTradeKind + ' $' + modalOrder + '</span>');
    
            if (Number(sessionStorage.balanceNow) < modalOrder) {
    
              balInsuficient();
    
            } else {
    
              OpInfo(modalOrder, sessionStorage.paramTradeKind);
    
              websocket.send(JSON.stringify({
                "buy": "1",
                "price": modalOrder,
                "parameters": {
                  "amount": modalOrder,
                  "basis": "stake",
                  "contract_type": "CALL",
                  "currency": currency,
                  "duration": total_tick,
                  "duration_unit": "t",
                  "symbol": market,
                  "barrier": barrier
                }
              }));
    
            }
          }
    
    

          if (sessionStorage.paramTradeKind == "Digit Differs") {
            // $("#market").attr("disabled", true);
          }
    
          function getBarrier(markt) {
    
            if (markt == 'R_10')
              return 0.25
            if (markt == 'R_25')
              return 0.3
            if (markt == 'R_50')
              return 0.03
            if (markt == 'R_75')
              return 250
            if (markt == 'R_100')
              return 2.5
    
            if (markt == '1HZ10V')
              return 0.20
            if (markt == '1HZ25V')
              return 20
            if (markt == '1HZ50V')
              return 75
            if (markt == '1HZ75V')
              return 3
            if (markt == '1HZ100V')
              return 1
    
          }
    
    
          function getRandomMarket() {
            var items = ['R_10', 'R_25', 'R_50', 'R_75', 'R_100', '1HZ10V', '1HZ25V', '1HZ50V', '1HZ75V', '1HZ100V'];
            return items[Math.floor(Math.random() * items.length)];
          }