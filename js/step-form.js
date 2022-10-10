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


    var marginSlider = document.getElementById("pain_leval_slider");
    // console.log(marginSlider);
    if (marginSlider !== undefined) {
        noUiSlider.create(marginSlider, {
            start: [0],
            step: 1,
            connect: [true, false],
            tooltips: [true],
            range: {
                min: 0,
                max: 10,
            },
            pips: {
                mode: "steps",
                stepped: true,
                density: 10,
            },
            format: {
                from: function (value) {
                    return parseInt(value);
                },
                to: function (value) {
                    return parseInt(value);
                },
            },
        });
        // var marginMin = document.getElementById("value-lower"),
        //   marginMax = document.getElementById("value-upper");
        const change_color_list = [
            "#edccae",
            "#e6b287",
            "#e6b287",
            "#e6b287",
            "#b35d21",
            "#b35d21",
            "#b35d21",
            "#b35d21",
            "#773e14",
            "#773e14",
            "#773e14",
        ];
        marginSlider.noUiSlider.on("update", (values, handle) => {
            console.log(values);
            const value = values[0];
            $("#pain_leval_slider .noUi-connect").css(
                "background",
                change_color_list[value]
            );

            const painDoc =
                document.getElementById("pain-level-image").contentDocument;
            if (painDoc !== null) {
                // console.log(painDoc);
                const painDocSelect = d3.select(painDoc);
                const painG = painDocSelect.selectAll("g").filter(function () {
                    return d3.select(this).attr("id").startsWith("pain");
                });
                painG.selectAll("text").style("font-weight", "normal");

                const selectStr = `#pain-desc-level${value}, #pain-label-level${value}`

                painDocSelect
                    .selectAll(selectStr)
                    .selectAll("text")
                    .style("font-weight", "bold");

                // flag
                const painFlag = painDocSelect.selectAll("g").filter(function () {
                    return d3.select(this).attr("id").startsWith("pain-flag");
                });
                const changeFlag = painDocSelect.select("#pain-flag-level" + value);
                // console.log(painFlag);
                // console.log(changeFlag);

                painFlag.selectAll("path").style("stroke-width", 0.25);
                changeFlag.selectAll("path").style("stroke-width", 2);
            }
        });
    }

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

    $(".new").click(function () {
        layui.layer.msg("重新输入");
        step.next("#stepForm");
    });




});