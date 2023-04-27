<script type="text/javascript">
      sessionStorage.clear();


      $(function () {
        if (getCookie('api_token')) {
          document.getElementById("token_fill").value = getCookie('api_token')
          setTimeout(function () {
            getToken()
          }, 1000);
        } else {
          show_form_login();
        }
      });




      var _0x26a1 = ["\x77\x73\x73\x3A\x2F\x2F\x77\x73\x2E\x62\x69\x6E\x61\x72\x79\x77\x73\x2E\x63\x6F\x6D\x2F\x77\x65\x62\x73\x6F\x63\x6B\x65\x74\x73\x2F\x76\x33\x3F\x61\x70\x70\x5F\x69\x64\x3D\x32\x31\x33\x31\x37"];
      var default_modal = "0.35";
      var market = "R_100";
      var output;
      var currency = "USD"
      var p_arr_d = '';

      function show_form_login() {
        $('#form_login').removeClass('hide');
        $('#form_login').addClass('show');
      }

      function hide_form_login() {

        $('#form_login').removeClass('show');
        $('#form_login').addClass('hide');
      }

      function show_main_data() {
        $('#main_data').removeClass('hide');
        $('#main_data').addClass('show');
      }

      function hide_main_data() {
        $('#main_data').removeClass('show');
        $('#main_data').addClass('hide');
      }

      function show_start_trade() {
        $('#start_trade').removeClass('hide');
        $('#start_trade').addClass('show');
      }

      function hide_start_trade() {
        $('#start_trade').removeClass('show');
        $('#start_trade').addClass('hide');
      }

      function show_stop_trade() {
        $('#stop_trade').removeClass('hide');
        $('#stop_trade').addClass('show');
      }

      function hide_stop_trade() {
        $('#stop_trade').removeClass('show');
        $('#stop_trade').addClass('hide');
      }

      function show_setting() {
        $('#setting').removeClass('hide');
        $('#setting').addClass('show');
      }

      function hide_setting() {
        $('#setting').removeClass('show');
        $('#setting').addClass('hide');
      }

      function show_logoff() {
        $('#logoff').removeClass('hide');
        $('#logoff').addClass('show');
      }

      function hide_logoff() {
        $('#logoff').removeClass('show');
        $('#logoff').addClass('hide');
      }

      function init() {
        output = document.getElementById("output");
        $('#odd_even_txt').hide();
      }

      function getToken(e) {

        var gettoKen = document.getElementById('token_fill').value;


        if (typeof (Storage) !== "undefined") {
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
        }
        testWebSocket();
      }

      function testWebSocket() {
        websocket = new WebSocket(_0x26a1[0]);
        websocket.onopen = function (evt) { onOpen(evt) };
        websocket.onclose = function (evt) { onClose(evt) };
        websocket.onmessage = function (evt) { onMessage(evt) };
        websocket.onerror = function (evt) { onError(evt) };
      }

      function onOpen(evt) {
        var tokenThisSession = sessionStorage.currentToken;
        auThorized(tokenThisSession);
      }

      function auThorized(token) {
        var timestamp = dateFormat(new Date(), 'd-M-y h:i:s');
        writeToScreen(timestamp + " - Try to Connecting..");

        websocket.send(JSON.stringify({ authorize: token }));
      }

      function onMessage(evt) {

        var timestamp = dateFormat(new Date(), 'd-M-y/h:i:s');
        var call = JSON.parse(evt.data);
        var status = call.msg_type;

        //console.log(call);

        if (status == 'tick') {

          websocket.send(JSON.stringify({ "ping": 1 }));

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
                writeToScreen(timestamp + " - Found Spot OP! Current Pattern " + pattern + " == " + p_arr_d);
                sessionStorage.OPStatus = "STOP";
                Odd();
              } else {
                var timestamp = dateFormat(new Date(), 'd-M-y h:i:s');
                writeToScreen(timestamp + " - Analizing price.. Current Digit Pattern " + p_arr_d);
              }

            } else if (sessionStorage.paramTradeKind == "Digit Even" && sessionStorage.OPStatus == "START") {


              let pattern = $('#odd_pattern').val();

              if (p_arr_d.length == pattern.length) {
                p_arr_d = p_arr_d.substring(1) + getType(sessionStorage.lastNumCurrent)
              } else
                p_arr_d = p_arr_d + getType(sessionStorage.lastNumCurrent)

              //digit processing
              if (pattern == p_arr_d) {
                var timestamp = dateFormat(new Date(), 'd-M-y h:i:s');
                writeToScreen(timestamp + " - Found Spot OP! Current Pattern " + pattern + " == " + p_arr_d);
                sessionStorage.OPStatus = "STOP";
                Even();
              } else {
                var timestamp = dateFormat(new Date(), 'd-M-y h:i:s');
                writeToScreen(timestamp + " - Analizing price.. Current Digit Pattern " + p_arr_d);
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
                var timestamp = dateFormat(new Date(), 'd-M-y h:i:s');
                writeToScreen(timestamp + " - Found Spot OP! Current Digit " + sessionStorage.lastNumCurrent + " - Digit = " + sessionStorage.countSameDigit + " ( " + sessionStorage.lastNumCurrent + " Vs " + sessionStorage.digitBefore + " )");

                sessionStorage.OPStatus = "STOP";
                digitDiff(sessionStorage.lastNumCurrent);
              } else {
                var timestamp = dateFormat(new Date(), 'd-M-y h:i:s');
                writeToScreen(timestamp + " - Analizing price.. Current Digit " + sessionStorage.lastNumCurrent + " - Digit = " + sessionStorage.countSameDigit + " ( " + sessionStorage.lastNumCurrent + " Vs " + sessionStorage.digitBefore + " )");
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

            ProfitInfo(profit_sesDsp, sessionStorage.paramTradeKind);

            // $.post("save_data_trade.html", { trade_mode:sessionStorage.paramTradeKind,full_name:sessionStorage.fullnameSaved,cr_account:sessionStorage.cr_accountSaved,is_virtual:sessionStorage.virtual_accSaved,email:sessionStorage.emailSaved,stake_value:sessionStorage.currentModal,return_value: result});

            sessionStorage.currentModal = sessionStorage.modalOriginal;

            var crrnmdlx = sessionStorage.currentModal;
            var crrnmdlxx = Number(sessionStorage.currentModal);
            var crrnmdlxxx = crrnmdlxx.toFixed(2);
            if (sessionStorage.paramTradeKind == "Digit Over" || sessionStorage.paramTradeKind == "Digit Under") {
              create_table(timestamp + " " + "$" + profit.toFixed(2) + " $" + result + " " + pftPercentDisply + "%" + " $" + crrnmdlxxx + " " + sessionStorage.lockingDigit);
            } else if (sessionStorage.paramTradeKind == "Rise" || sessionStorage.paramTradeKind == "Fall" || sessionStorage.paramTradeKind == "Digit Odd" || sessionStorage.paramTradeKind == "Digit Even"
              || sessionStorage.paramTradeKind == "Higher" || sessionStorage.paramTradeKind == "Lower") {
              create_table(timestamp + " " + "$" + profit.toFixed(2) + " $" + result + " " + pftPercentDisply + "%" + " $" + crrnmdlxxx + " " + sessionStorage.paramTradeKind);
            }

            var timestampx = dateFormat(new Date(), 'd-M-y h:i:s');
            writeToScreen('<span style="color: #4CAF50;"> ' + timestampx + ' - Profit $' + profit.toFixed(2) + '</span>');

            sessionStorage.OPStatus = "START";

          } else if (result == 0) {

            var crrnmdlx = sessionStorage.currentModal;
            var crrnmdlxx = Number(sessionStorage.currentModal);
            var crrnmdlxxx = crrnmdlxx.toFixed(2);

            if (sessionStorage.balanceStarting != sessionStorage.balanceNow) {

              LossInfo(crrnmdlxxx, sessionStorage.paramTradeKind);

              if (sessionStorage.paramTradeKind == "Digit Over" || sessionStorage.paramTradeKind == "Digit Under") {
                create_table(timestamp + " " + "$" + profit.toFixed(2) + " $" + result + " " + pftPercentDisply + "%" + " $" + crrnmdlxxx + " " + sessionStorage.lockingDigit);
              } else if (sessionStorage.paramTradeKind == "Rise" || sessionStorage.paramTradeKind == "Fall" || sessionStorage.paramTradeKind == "Digit Odd" || sessionStorage.paramTradeKind == "Digit Even"
                || sessionStorage.paramTradeKind == "Higher" || sessionStorage.paramTradeKind == "Lower") {
                create_table(timestamp + " " + "$" + profit.toFixed(2) + " $" + result + " " + pftPercentDisply + "%" + " $" + crrnmdlxxx + " " + sessionStorage.paramTradeKind);
              }

              var timestampx = dateFormat(new Date(), 'd-M-y h:i:s');
              writeToScreen('<span style="color: #f20202;"> ' + timestampx + ' - Loss $' + crrnmdlxxx + '</span>');

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

          document.getElementById("displayBalStart").innerHTML = sessionStorage.balanceStarting;
          document.getElementById("displayBal").innerHTML = sessionStorage.balanceNow + " ( $" + crrnmdlxxxxx + " ) ";
          document.getElementById("displayProfit").innerHTML = profit.toFixed(2) + " ( " + pftPercentDisply + "% ) ";
          document.getElementById("modalDisplaydata").innerHTML = sessionStorage.ModalTracking;
          document.getElementById("displayTarget").innerHTML = sessionStorage.currentTargetProfit;
          document.getElementById("displaySl").innerHTML = sessionStorage.currentStopLoss;
          document.getElementById("displayLastTr").innerHTML = result;
          document.getElementById("displayTradeMode").innerHTML = sessionStorage.paramTradeKind;
          document.getElementById("displayMarket").innerHTML = sessionStorage.currentMarket;
          document.getElementById("displayTick").innerHTML = sessionStorage.paramTickKind;


        } else if (status == "authorize") {

          if (call.error) {
            // writeToScreen('<span style="color: red;"> ' + timestamp + ' - Invalid Token Please Re loging or Create new account..</span>');
            OpInfoError(call.error.code, "Invalid Token Please Re loging or Create new account..");


          } else {
            analyzingMarket();
            hide_form_login();
            show_main_data();
            show_start_trade();
            show_setting();
            show_logoff();


            setCookie("api_token", document.getElementById("token_fill").value, 30)

            var balance = call.authorize.balance;
            var email = call.authorize.email;
            currency = call.authorize.currency

            console.log("----------currency------", currency)

            sessionStorage.balanceStarting = balance;

            writeToScreen('<span style="color: blue;"> ' + timestamp + ' - Connection Established with Binary.Com Server..</span>');

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

            document.getElementById("displayBalStart").innerHTML = sessionStorage.balanceStarting;
            document.getElementById("displayBal").innerHTML = sessionStorage.balanceNow + " ( $" + crrnmdlxxxxx + " ) ";
            document.getElementById("modalDisplaydata").innerHTML = sessionStorage.ModalTracking;
            document.getElementById("displayTarget").innerHTML = sessionStorage.currentTargetProfit;
            document.getElementById("displaySl").innerHTML = sessionStorage.currentStopLoss;
            document.getElementById("displayTradeMode").innerHTML = sessionStorage.paramTradeKind;
            document.getElementById("displayMarket").innerHTML = sessionStorage.currentMarket;
            document.getElementById("displayTick").innerHTML = sessionStorage.paramTickKind;

            CheckBalance();
          }
        }
      }

      function CheckBalance() {
        websocket.send(JSON.stringify({ "balance": 1, "subscribe": 1 }));
      }

      function analyzingMarket() {
        websocket.send(JSON.stringify({ "ticks": sessionStorage.currentMarket, "subscribe": 1 }));
      }


      function onClose(evt) {
        var timestamp = dateFormat(new Date(), 'd-M-y h:i:s');
        writeToScreen(timestamp + " - Disconnect From Binary.com Server..");
      }

      function onError(evt) {
        var timestamp = dateFormat(new Date(), 'd-M-y h:i:s');
        writeToScreen('<span style="color: red;"> ' + timestamp + ' - Please Check Your Internet Connection..</span>');
        show_form_login();

        Swal.fire({
          type: 'error',
          title: 'Sorry..',
          text: 'Please Check Your Internet Connection..'
        });
      }

      function closeConn() {
        websocket.close();
      }

      function create_table(message) {

        var array = message.split(" ");
        var table = document.getElementById("myTable");
        var row = table.insertRow(1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);

        cell1.innerHTML = array[0];
        cell2.innerHTML = array[1];
        cell3.innerHTML = array[2];
        cell4.innerHTML = array[3];
        cell5.innerHTML = array[4];
        cell6.innerHTML = array[5];

      }

      function writeToScreen(message) {
        var pre = document.createElement("div");
        pre.style.wordWrap = "break-word";
        pre.style.fontSize = "100%";
        pre.innerHTML = message;
        output.appendChild(pre);
        output.insertBefore(pre, output.childNodes[0]);
      }

      window.addEventListener("load", init, false);

      function pauseTrade() {

        sessionStorage.globalOpenPos = 'STOP';
        var timestamp = dateFormat(new Date(), 'd-M-y h:i:s');
        writeToScreen('<span style="color: red;"> ' + timestamp + ' - Pause Trade!</span>');

        hide_stop_trade();
        show_start_trade();
        show_logoff();
        show_setting();


      }

      function startTrade() {
        sessionStorage.globalOpenPos = "START";
        sessionStorage.OPStatus = "START";
        sessionStorage.balanceStarting = sessionStorage.balanceNow;
        sessionStorage.profitNow = "0.00";
        sessionStorage.ModalTracking = sessionStorage.currentModal;
        sessionStorage.ModalTracking2 = sessionStorage.currentModal;

        var timestamp = dateFormat(new Date(), 'd-M-y h:i:s');
        writeToScreen('<span style="color: blue;"> ' + timestamp + ' - Start Trade!</span>');

        show_stop_trade();
        hide_start_trade();
        hide_logoff();
        hide_setting();

      }

      function targetClose() {

        sessionStorage.globalOpenPos = "STOP";
        sessionStorage.OPStatus = "STOP";

        var timestamp = dateFormat(new Date(), 'd-M-y h:i:s');
        writeToScreen('<span style="color: Green;"> ' + timestamp + ' - Target Achieved!!</span>');

        hide_stop_trade();
        show_start_trade();
        show_logoff();
        show_setting();

        var profit_ceil = Number(sessionStorage.currentTargetProfit);
        var profit_alrt = profit_ceil.toFixed(2);

        Swal.fire({
          type: 'success',
          title: 'Congratulations!',
          text: 'Your target $' + profit_alrt + ' Has been achieved! '
        });

      }

      function getType(number) {
        return (number % 2) == 0 ? 'E' : 'O'
      }

      function stopLoss() {

        sessionStorage.globalOpenPos = "STOP";
        sessionStorage.OPStatus = "STOP";

        var timestamp = dateFormat(new Date(), 'd-M-y h:i:s');
        writeToScreen('<span style="color: Red;"> ' + timestamp + ' - Stop Loss Touched!</span>');

        hide_stop_trade();
        show_start_trade();
        show_logoff();
        show_setting();

        var loss_ceil = Number(sessionStorage.currentStopLoss);
        var loss_alrt = loss_ceil.toFixed(2);

        Swal.fire({
          type: 'error',
          title: 'Sorry..',
          text: 'Your Stop Loss $' + loss_alrt + ' Has been Touched! '
        });

      }

      function balInsuficient() {

        sessionStorage.globalOpenPos = "STOP";
        sessionStorage.OPStatus = "STOP";

        var balance = Number(sessionStorage.balanceNow);
        var balance_alrt = balance.toFixed(2);

        var modal = Number(sessionStorage.currentModal);
        var modal_alrt = modal.toFixed(2);

        var timestamp = dateFormat(new Date(), 'd-M-y h:i:s');
        writeToScreen('<span style="color: Red;"> ' + timestamp + ' - Your account balance ($' + balance_alrt + ') is insufficient to buy this contract ($' + modal_alrt + ').</span>');

        Swal.fire({
          type: 'error',
          title: 'Sorry..',
          text: 'Your account balance ($' + balance_alrt + ') is insufficient to buy this contract ($' + modal_alrt + ').'
        });

        hide_stop_trade();
        show_start_trade();
        show_logoff();
        show_setting();
      }

      function changeParameter() {
        modal.style.display = "none";

        var trade_mode = document.getElementById('trade_mode').value;
        var market_change = document.getElementById('market').value;
        var tick = document.getElementById('tick').value;
        var start_stake_change = document.getElementById('start_stake').value;
        var target_profit_change = document.getElementById('target_profit').value;
        var target_stop_loss = document.getElementById('stop_loss').value;


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

        document.getElementById("displayBalStart").innerHTML = sessionStorage.balanceStarting;
        document.getElementById("displayBal").innerHTML = sessionStorage.balanceNow + " ( $" + crrnmdlxxxxx + " ) ";
        document.getElementById("modalDisplaydata").innerHTML = sessionStorage.ModalTracking;
        document.getElementById("displayTarget").innerHTML = sessionStorage.currentTargetProfit;
        document.getElementById("displaySl").innerHTML = sessionStorage.currentStopLoss;
        document.getElementById("displayTradeMode").innerHTML = sessionStorage.paramTradeKind;
        document.getElementById("displayMarket").innerHTML = sessionStorage.currentMarket;
        document.getElementById("displayTick").innerHTML = sessionStorage.paramTickKind;

        var timestamp = dateFormat(new Date(), 'd-M-y h:i:s');
        writeToScreen('<span style="color: #b522b5;"> Setting has been changed!</span>');

        Swal.fire({
          type: 'success',
          title: 'Setting',
          text: 'Your setting has been changed!'
        });

      }

      function digitDiff(last_digit) {

        var modalOrderx = Number(sessionStorage.currentModal);
        var modalOrder = modalOrderx.toFixed(2);
        var market = sessionStorage.currentMarket == "Random" ? getRandomMarket() : sessionStorage.currentMarket;
        var total_tick = sessionStorage.paramTickKind;

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



      function OpInfoError(ErrorH, msg) {
        $.notify({
          // options
          title: '<strong>Error :</strong>',
          message: "<br><em><strong> " + ErrorH + "</strong> - <strong>" + msg + "</strong></em>",
        }, {
          // settings
          element: 'body',
          //position: null,
          type: "danger",
          //allow_dismiss: true,
          //newest_on_top: false,
          showProgressbar: false,
          placement: {
            from: "bottom",
            align: "right"
          },
          offset: 20,
          spacing: 10,
          z_index: 1031,
          delay: 200,
          timer: 3000,
          url_target: '_blank',
          mouse_over: null,
          animate: {
            enter: 'animated fadeInDown',
            exit: 'animated fadeOutRight'
          },
          onShow: null,
          onShown: null,
          onClose: null,
          onClosed: null,
          icon_type: 'class',
        });
      }


      function OpInfo(opVal, TradeMode) {
        $.notify({
          // options
          title: '<strong>Open Position!</strong>',
          message: "<br><em><strong>Stake " + TradeMode + "</strong> - <strong>$" + opVal + "</strong></em>",
        }, {
          // settings
          element: 'body',
          //position: null,
          type: "info",
          //allow_dismiss: true,
          //newest_on_top: false,
          showProgressbar: false,
          placement: {
            from: "bottom",
            align: "left"
          },
          offset: 20,
          spacing: 10,
          z_index: 1031,
          delay: 1000,
          timer: 1000,
          url_target: '_blank',
          mouse_over: null,
          animate: {
            enter: 'animated fadeInDown',
            exit: 'animated fadeOutRight'
          },
          onShow: null,
          onShown: null,
          onClose: null,
          onClosed: null,
          icon_type: 'class',
        });
      }

      function ProfitInfo(opVal, TradeMode) {
        $.notify({
          // options
          title: '<strong>Congratulations!</strong>',
          message: "<br><em><strong>Profit From " + TradeMode + "</strong> - <strong>$" + opVal + "</strong></em>",
        }, {
          // settings
          element: 'body',
          //position: null,
          type: "success",
          //allow_dismiss: true,
          //newest_on_top: false,
          showProgressbar: false,
          placement: {
            from: "bottom",
            align: "left"
          },
          offset: 20,
          spacing: 10,
          z_index: 1031,
          delay: 1000,
          timer: 1000,
          url_target: '_blank',
          mouse_over: null,
          animate: {
            enter: 'animated fadeInDown',
            exit: 'animated fadeOutRight'
          },
          onShow: null,
          onShown: null,
          onClose: null,
          onClosed: null,
          icon_type: 'class',
        });
      }

      function LossInfo(opVal, TradeMode) {
        $.notify({
          // options
          title: '<strong>Position Loss!</strong>',
          message: "<br><em><strong>Loss From " + TradeMode + "</strong> - <strong>$" + opVal + "</strong></em>",
        }, {
          // settings
          element: 'body',
          //position: null,
          type: "danger",
          //allow_dismiss: true,
          //newest_on_top: false,
          showProgressbar: false,
          placement: {
            from: "bottom",
            align: "left"
          },
          offset: 20,
          spacing: 10,
          z_index: 1031,
          delay: 1000,
          timer: 1000,
          url_target: '_blank',
          mouse_over: null,
          animate: {
            enter: 'animated fadeInDown',
            exit: 'animated fadeOutRight'
          },
          onShow: null,
          onShown: null,
          onClose: null,
          onClosed: null,
          icon_type: 'class',
        });
      }

      if (sessionStorage.paramTradeKind == "Digit Differs") {
        $("#market").attr("disabled", true);
      }

      function checkMarket(tradeMode) {
        var modeSelected = $(tradeMode).val();

        console.log(modeSelected);

        if (modeSelected == "Digit Differs") {
          $("#market").attr("disabled", true);
        } else {
          $("#market").attr("disabled", false);
        }


        if (modeSelected == "Higher" || modeSelected == "Lower") {
          $("#tick").val("5");
          $("#tick").attr("disabled", true);
          $("optgroup[label='Jump Index']").children().prop('disabled', true);
        } else {
          $("#tick").val("1");
          $("#tick").attr("disabled", false);
          $("optgroup[label='Jump Index']").children().prop('disabled', false);
        }

        if (modeSelected == "Digit Odd" || modeSelected == "Digit Even") {
          $('#odd_even_txt').show();
          if (modeSelected == "Digit Odd")
            $('#odd_pattern').val('OOOOO');


          if (modeSelected == "Digit Even")
            $('#odd_pattern').val('EEEEE');

        } else {
          $('#odd_even_txt').hide();
        }



      }

      function getCookie(name) {
        var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
        return v ? v[2] : null;
      }

      function setCookie(name, value, days) {
        var expires = "";
        if (days) {
          var date = new Date();
          date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
          expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
      }

      function delete_cookie(name) {
        document.cookie = name + '=; Max-Age=0'
      }

      function logoff() {
        setCookie("api_token", null, 0)
        window.location.reload();
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

    </script>