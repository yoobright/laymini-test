layui.use(["form", "step"], function () {
    var $ = layui.$,
        form = layui.form,
        step = layui.step;

    form.verify({
        radioRequired: function (value, item) {
            const inputBlock = $(item);
            const inputChecked = inputBlock.find("input:checked");
            const text = inputBlock.prev().text();
            if (inputChecked.length === 0) {
                return `选项'${text}'不能为空`;
            }
        },
    });

    function addCheckBox(forType, elementList, required = "") {

        const labelElement = $(`label#${forType}_label`);

        if (labelElement.length > 0) {
            const blockElement =
                $(`<div class="layui-input-block" id="${forType}_block">`);
            if (Array.isArray(elementList[0])) {
                const items = elementList.map((v) =>
                    `<input type="checkbox" name="${forType}" id="${forType}" 
                    value="${v[1]}" title="${v[0]}" />`
                );
                blockElement.append(items);
            } else {
                const items = elementList.map((v, i) =>
                    `<input type="checkbox" name="${forType}" id="${forType}" 
                    value="${i + 1}" title="${v}" />`
                );
                blockElement.append(items);
            }

            labelElement.after(blockElement);
        }
    }


    const userPainCharacterList = [
        ["酸痛", 1],
        ["刺痛", 2],
        ["跳痛", 3],
        ["钝痛", 4],
        ["绞痛", 5],
        ["胀痛", 6],
        ["坠痛", 7],
        ["钻顶样痛", 8],
        ["爆裂样痛", 9],
        ["撕裂样痛", 10],
        ["牵拉样痛", 11],
        ["压榨样痛", 12],
        ["放电样痛", 13],
        ["烧灼样痛", 15],
        ["麻木样痛", 16],
        ["刀割样痛", 17],
        ["轻触痛", 19],
        ["无名痛", 23],
        ["隐痛", 24],
        ["尖锐痛", 25],
    ];
    const userPainCharacterTag = "user_pain_character";
    addCheckBox(userPainCharacterTag, userPainCharacterList);

    // userPainAggrFactor
    const userPainAggrFactorList = [
        ["行走", 1],
        ["活动", 2],
        ["体位变化", 3],
        ["排便", 4],
        ["咳嗽", 5],
        ["进食", 6],
        ["天气", 7],
        ["乏力", 8],
        ["精神因素", 9],
        ["其他", -1],
    ];
    const userPainAggrFactorTag = "user_pain_aggr_factor";
    addCheckBox(userPainAggrFactorTag, userPainAggrFactorList);

    // userPainReliFactor
    const userPainReliFactorList = [
        ["服用镇痛药", 1],
        ["环境安静", 2],
        ["光线柔和", 3],
        ["温度适宜", 4],
        ["心理积极", 5],
        ["家人陪伴", 6],
        ["其他", -1],
    ];
    const userPainReliFactorTag = "user_pain_reli_factor";
    addCheckBox(userPainReliFactorTag, userPainReliFactorList);

    form.render();

    step.render({
        elem: "#stepForm",
        filter: "stepForm",
        width: "100%", //设置容器宽度
        stepWidth: "800px",
        height: "600px",
        stepItems: [
            {
                title: "基本信息",
            },
            {
                title: "疼痛评估",
            },
            {
                title: "既往用药",
            },
        ],
    });

    form.on("submit(formStep)", function (data) {
        step.next("#stepForm");
        return false;
    });

    form.on("submit(formStep2)", function (data) {
        step.next("#stepForm");
        return false;
    });

    $(".pre").click(function () {
        step.pre("#stepForm");
    });

    $(".next").click(function () {
        step.next("#stepForm");
    });




});