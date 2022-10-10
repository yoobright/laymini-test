layui.use(["form", "miniTab", "step"], function () {
    var $ = layui.$,
        form = layui.form,
        step = layui.step,
        miniTab = layui.miniTab;

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

    form.on("submit(formStep3)", function (data) {
        layui.layer.msg("提交成功");
        const herfTab =  "page/painResult.html";
        miniTab.openNewTabByIframe({
            href: herfTab,
            title: "按钮示例",
          });
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

    // ========================================================================
    // body view
    const bodyKV = {
        "1": "面部",
        "2": "头后部",
        "3": "右上臂（内侧）",
        "4": "右上臂（外侧）",
        "5": "左上臂（内侧）",
        "6": "左上臂（外侧）",
        "7": "右前臂（内侧）",
        "8": "右前臂（外侧）",
        "9": "左前臂（内侧）",
        "10": "左前臂（外侧）",
        "11": "右手",
        "12": "左手",
        "13": "颈胸部",
        "14": "颈背部",
        "15": "腹部（前）",
        "16": "腹部（后）",
        "17": "腰部（前）",
        "18": "腰部（后）",
        "19": "盆部（右）",
        "20": "腰骶部（右）",
        "21": "臀部（右）",
        "22": "盆部（左）",
        "23": "腰骶部（左）",
        "24": "臀部（左）",
        "25": "大腿（右前）",
        "26": "大腿（右后）",
        "27": "大腿（左前）",
        "28": "大腿（左后）",
        "29": "小腿（右前）",
        "30": "小腿（右后）",
        "31": "小腿（左前）",
        "32": "小腿（左后）",
        "33": "右足",
        "34": "左足"
    }

    function togglePartView(p) {
        const dataSelceted = p.attr("data_selceted");
        // console.log('svg click!!!!', this.id, data_selceted);
        if (dataSelceted === "true") {
            p.attr("data_selceted", "false");
            p.classed("st1", true);
            p.classed("st1_selected", false);
            p.style("opacity", 0.5);
            p.style("fill", "");
        } else {
            p.attr("data_selceted", "true");
            p.classed("st1", false);
            p.classed("st1_selected", true);
            p.style("opacity", 0.4);
        }
    }

    function updateBodySelected(bodyId, currentSelect, bodyPloygon) {
        if (bodyId.match(/\d+/u)) {
            togglePartView(currentSelect, bodyId);
            const bodySelect = bodyPloygon.filter("[data_selceted='true']");
            const selectIDList = bodySelect._groups[0].map((value) => {
                return value.id.split("_")[2];
            });

            console.log(selectIDList);
            const selectNameList = selectIDList.map((id) => {
                return bodyKV[id];
            });

            const currentNameList = $("#user_pain_part")
                .text()
                .trim()
                .split(", ")
                .filter((v) => v !== "");

            console.log("select: " + selectNameList);
            console.log("current: " + currentNameList);

            const updateNameList = (function (current, select) {
                if (current.length < select.length) {
                    const addNameList = select.filter((v) => current.indexOf(v) === -1);
                    console.log("add: " + addNameList);

                    return current.concat(addNameList);
                } else if (current.length > select.length) {
                    return current.filter((v) => select.indexOf(v) !== -1);
                } else {
                    return current;
                }
            })(currentNameList, selectNameList);

            console.log(updateNameList);
            $("#user_pain_part").text(updateNameList.join(", "));
            // console.log(list);
        }
    }

    $('#body-view-image')[0].addEventListener('load', function () {
        console.log("load body image");
        const bodyDoc = document.getElementById("body-view-image").contentDocument;
        const bodyPloygon = d3.select(bodyDoc).selectAll("polygon");

        bodyPloygon.attr("data_selceted", "false");

        bodyPloygon.on("click", function () {
            const p = d3.select(this);
            const bodyID = p.attr("id").split("_")[2];

            console.log(bodyID);
            updateBodySelected(bodyID, p, bodyPloygon);
        });
        d3.select(bodyDoc)
            .selectAll("text")
            .filter(function () {
                return !d3.select(this).classed("st_label");
            })
            .on("click", function () {
                const bodyID = d3.select(this).text().trim();
                const idName = "#part_x5F_".concat(bodyID);
                console.log(idName);
                const p = d3.select(this.parentNode.parentNode).select(idName);

                updateBodySelected(bodyID, p, bodyPloygon);
            });
    }, true);

    // ========================================================================



});