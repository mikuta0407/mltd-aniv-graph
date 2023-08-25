// データ取得からグラフ生成まで一気にやっちゃう関数
async function generateGraph(idolId) {

    // const nowJST = new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" });
    // const dt = new Date(nowJST);
    // const logStartTime = new Date(dt.getTime() - 3778620000)
    // const logStartTimeStr = logStartTime.toISOString().split('Z')[0] + '+09:00';

    // 取得開始時間を指定(本番はここを現在時刻 - 10分くらいにする)
    const logStartTimeStr = "2023-07-13T00:00:00+09:00"

    // 取得する順位
    const getRankValue = "1000,950,900,850,800,750,700,650,600,550,500,450,400,350,300,250,200,150";
    
    // リクエスト実行
    const res = await fetch("https://api.matsurihi.me/api/mltd/v2/events/290/rankings/idolPoint/" + idolId + "/logs/" + getRankValue + "?all&since=" + logStartTimeStr);
    const resJson = await res.json()

    // 配列準備
    let ranks = new Array()
    ranks["labels"] = new Array()
    ranks["points"] = new Array()

    // 配列から順位値とポイントをグラフ生成用に配列へ整形
    resJson.forEach(element => {
        ranks["labels"].push(element["rank"])
        // 配列の最後=最新を取り出す
        ranks["points"].push(element["data"].slice(-1)[0]["score"])
    });

    // 最新の更新時刻を取得し、表示させる
    timeStr = resJson.slice(-1)[0]["data"].slice(-1)[0]["aggregatedAt"];
    let timeStrElement = document.getElementById('time');
    timeStrElement.innerHTML = "<p>" + timeStr + "</p>";

    // canvasを掴む
    let ctx = document.getElementById('chart');

    let data = {
        labels: ranks["labels"], // x軸のラベル(順位)
        datasets: [{
            label: 'point graph',
            data: ranks["points"], // プロットする値
            borderColor: 'rgba(39, 67, 210, 1)' // 色(千早なので)
        }]
    };

    let chart = new Chart(ctx, {
        type: 'line', // 線グラフ
        data: data,
        options: []
    });
};

generateGraph(2); // idolIdは2
