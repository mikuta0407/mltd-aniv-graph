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
    let ctx = document.getElementById('chart_' + idolId);

    let data = {
        labels: ranks["labels"], // x軸のラベル(順位)
        datasets: [{
            label: idolData[idolId][0],
            data: ranks["points"], // プロットする値
            borderColor: idolData[idolId][1] // 色
        }]
    };

    let chart = new Chart(ctx, {
        type: 'line', // 線グラフ
        data: data,
        options: []
    });
};

// チェックボックスにlistenerをすべて貼りつける
let chk = document.querySelectorAll("input[type='checkbox']");
console.log(chk);
for (let i = 0; i < chk.length; i++) {
    chk[i].addEventListener('change', function () {
        let isChecked = chk[i].checked;
        let divParent = document.getElementById('canvas_' + chk[i].value);
        if (isChecked) {
            var element = document.createElement('canvas');
            element.id = "chart_" + chk[i].value;
            element.className = "chart";
            divParent.appendChild(element);
            generateGraph(chk[i].value);
        } else {
            console.log("unchecked");
            divParent.removeChild(document.getElementById("chart_" + chk[i].value));
        }
    });
}

let idolData = [
    ['名前', 'colorcode'],
    ['天海 春香', '#e22b30'],
    ['如月 千早', '#2743d2'],
    ['星井 美希', '#b4e04b'],
    ['萩原 雪歩', '#d3dde9'],
    ['高槻 やよい', '#f39939'],
    ['菊地 真', '#515558'],
    ['水瀬 伊織', '#fd99e1'],
    ['四条 貴音', '#a6126a'],
    ['秋月 律子', '#01a860'],
    ['三浦 あずさ', '#9238be'],
    ['双海 亜美', '#ffe43f'],
    ['双海 真美', '#ffe43f'],
    ['我那覇 響', '#01adb9'],
    ['春日 未来', '#ea5b76'],
    ['最上 静香', '#6495cf'],
    ['伊吹 翼', '#fed552'],
    ['田中 琴葉', '#92cfbb'],
    ['島原 エレナ', '#9bce92'],
    ['佐竹 美奈子', '#58a6dc'],
    ['所 恵美', '#454341'],
    ['徳川 まつり', '#5abfb7'],
    ['箱崎 星梨花', '#ed90ba'],
    ['野々原 茜', '#eb613f'],
    ['望月 杏奈', '#7e6ca8'],
    ['ロコ', '#fff03c'],
    ['七尾 百合子', '#c7b83c'],
    ['高山 紗代子', '#7f6575'],
    ['松田 亜利沙', '#b54461'],
    ['高坂 海美', '#e9739b'],
    ['中谷 育', '#f7e78e'],
    ['天空橋 朋花', '#bee3e3'],
    ['エミリー スチュアート', '#554171'],
    ['北沢 志保', '#afa690'],
    ['舞浜 歩', '#e25a9b'],
    ['木下 ひなた', '#d1342c'],
    ['矢吹 可奈', '#f5ad3b'],
    ['横山 奈緒', '#788bc5'],
    ['二階堂 千鶴', '#f19557'],
    ['馬場 このみ', '#f1becb'],
    ['大神 環', '#ee762e'],
    ['豊川 風花', '#7278a8'],
    ['宮尾 美也', '#d7a96b'],
    ['福田 のり子', '#eceb70'],
    ['真壁 瑞希', '#99b7dc'],
    ['篠宮 可憐', '#b63b40'],
    ['百瀬 莉緒', '#f19591'],
    ['永吉 昴', '#aeb49c'],
    ['北上 麗花', '#6bb6b0'],
    ['周防 桃子', '#efb864'],
    ['ジュリア', '#d7385f'],
    ['白石 紬', '#ebe1ff'],
    ['桜守 歌織', '#274079']
];
