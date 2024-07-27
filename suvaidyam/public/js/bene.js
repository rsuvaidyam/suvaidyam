function main_conatiner(id,frm) {
    document.getElementById(id).innerHTML =  `
        <style>
                    * {
                        margin: 0%;
                        padding: 0%;
                        box-sizing: border-box;
                    }

                    #container {
                        background-color: #f4f4f4;
                        display: flex;
                        width: 100%;
                        gap: 10px;
                    }

                    #card_1 {
                        width: 250px;
                    }

                    #card_2 {
                        width: 60%;
                        border: 2px solid f4f4f4;
                    }

                    #card_3 {
                        width: 20%;
                        border: 2px solid f4f4f4;
                    }

                    #child_card1 {
                        border: 2px solid f4f4f4;
                        /* height: 30%; */
                        padding: 13px;
                    }

                    #child_card2 {
                        border: 2px solid f4f4f4;
                        height: 50%;
                    }
                    // #form-container{
                    // max-height:50%;    
                    // overflow-y: auto;
                    // }
                    #avtar_head {
                        margin-left: 10px;
                    }

                    #child_card2_inner {
                        display: flex;
                        flex-direction: column;
                        
                    }

                    #Inbounds,
                    #Outbound,
                    #Campgain {
                        cursor: pointer;
                        padding: 5px;
                        margin: 5px 0;
                        border-left:5px solid transparent;

                    }

                    .dropdown_camp {
                        min-width: 160px;
                        max-height: 150px;
                        padding: 0px 16px;
                        overflow-y: auto;
                    }

                    .dropdown_camp a {
                        color: black;
                        padding: 4px 12px;
                        text-decoration: none;
                        display: block;
                        border-left:5px solid transparent;
                    }

                    .dropdown_camp a:hover {
                        background-color: #f1f1f1;
                    }

                    #in_bounds {
                        width: 90px;
                        height:23px;
                        background-color: #f4f4f4;
                        border-radius: 40px;
                        font-size: 13px;
                        text-align:center;
                        padding:1.5px
                    }
                    #span_p{
                        margin-top:-2px;
                        margin-left:3px
                    }
                    #gap_avtar{
                        display: flex;
                        gap:10px;
                    }
                    #rt_contant{
                        display: flex;
                        gap:5px;
                        padding: 10px
                    }
                    .his_dropdown{
                        min-width: 160px;
                        max-height: 150px;
                        padding: 0px 16px;
                        overflow-y: auto
                    }
                    .his_dropdown a {
                        color: black;
                        padding: 4px 12px;
                        text-decoration: none;
                        display: block;
                    }
    </style>

<body>
    <div class="p-3" id="container">
        <div id="card_1">
           ${left_side(frm)}
        </div>
        <div id="card_2" class="card p-3">No Data avilable</div>
       ${right_side()}

    </div>
    </body>
    `
        const sidePage = document.getElementById("card_2")
     

        function deselectParagraphs() {
            const paragraphs = document.querySelectorAll("#Inbounds, #Outbound");
            paragraphs.forEach(p => {
                p.style.backgroundColor = "";
                p.style.borderLeft = '';
                p.style.color = '';
            });
            sidePage.innerHTML = "";
        }

        // ========= left dropdown ===========
        frm?.doc?.campaign.length > 0 && frm?.doc?.campaign.forEach(camp => {
            let paragraph = document.querySelector(`#${camp.campaign}`);
            paragraph.addEventListener("click", async function () {
                deselectParagraphs()
                frm?.doc?.campaign.forEach((campaign) => {
                    if (campaign.campaign !== camp.campaign) {
                        let paragraph = document.querySelector(`#${campaign.campaign}`);
                        paragraph.style.backgroundColor = "";
                        paragraph.style.borderLeft = '5px solid transparent';
                    }
                })
                this.style.backgroundColor = "#f4f4f4";
                this.style.borderLeft = '5px solid blue';
                await fetchData(camp.campaign,sidePage);
            });
        });

        // ====== #Inbounds, #Outbound ===
        const contentMap = {
            "Inbounds": inbound(),
            "Outbound": outbound(),
        };
        const paragraphs = document.querySelectorAll("#Inbounds, #Outbound");

        function selectParagraph(paragraph) {
            deselectParagraphs();
            frm?.doc?.campaign.length > 0 && frm?.doc?.campaign.forEach(camp => {
                let paragraph = document.querySelector(`#${camp.campaign}`);
                paragraph.style.backgroundColor = "";
                paragraph.style.borderLeft = '5px solid transparent';
            });
            paragraph.style.backgroundColor = "#f4f4f4";
            paragraph.style.borderLeft = '5px solid blue';
            sidePage.innerHTML = contentMap[paragraph.id];
        }
        
        paragraphs.forEach(paragraph => {
            paragraph.addEventListener("click", function (event) {
                selectParagraph(this);
            });
        });
        
        // Select "Inbounds" by default
        const inboundParagraph = document.querySelector("#Inbounds");
        if (inboundParagraph) {
            selectParagraph(inboundParagraph);
        }
        

}
// 
function left_side(frm) { 
    // frappe.call({
    //     method: 'suvaidyam.services.apis.get_campaign_name',
    //     args: { id: frm.doc.name },
    //     callback: function(response) {
    //         const dropdown = document.getElementById('dropdown_camp');
    //         if (dropdown) {
    //             const campaignLinks = response.message.map(e => `<a id="${e.name}">${e.name1}</a>`).join('\n');
    //             dropdown.innerHTML = campaignLinks;
    //         }
    //     }
    // });
    return ` <div id="child_card1" class="card ">
                <div id="avtar_main" class="d-flex justify-content-between">
                    <div id="gap_avtar"> 
                        <div>
                            <p>${frm?.doc?.first_name + ' ' + frm?.doc?.last_name}</p>
                            <p>${frm?.doc?.gender?.split('')[0]} || <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-telephone" viewBox="0 0 16 16">
                                    <path
                                        d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z" />
                                </svg> <span  style="color: blue;">${frm?.doc?.phone_number}</span></p>
                            <div class="d-flex" id="location"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-geo-alt" viewBox="0 0 16 16">
                                    <path
                                        d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10" />
                                    <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                                </svg>
                                <div id="span_p">${frm?.doc?.address_1}</div></div>
                        </div>
                    </div>

                   
                </div>
                <hr>
                <div class="d-flex justify-content-between">
                    <p id="in_bounds">Inbound : 0</p>
                    <p id="in_bounds">Outbound : 0</p>
                </div>
            </div>
            <div id="child_card2" class="card mt-2 ">
                <div id="child_card2_inner">
                    <p id="Inbounds">Inbound</p>
                    <p id="Outbound">Outbound</p>
                    <p id="Campgain">Campgain</p>
                    <div id="dropdown_camp" class="dropdown_camp">
                     ${frm?.doc?.campaign.map(e => `<a id=${e.campaign}>${e.campaign}</a>`).join('\n')}
                    </div>
                </div>
            </div>`
}
function right_side() {
    return`<div id="card_3" class="card">
            <div id="rt_contant">
                <svg style="margin-top: 5;" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                    fill="currentColor" class="bi bi-arrow-counterclockwise" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2z" />
                    <path
                        d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466" />
                </svg>
                <p class="">History</p>
            </div>
            <div id="dropdown" class="his_dropdown">
                <a>Option 1</a>
                <a>Option 2</a>
                <a>Option 3</a>
                <a>Option 4</a>
                <a>Option 5</a>
                <a>Option 6</a>
                <a>Option 7</a>
                <a>Option 8</a>
                <a>Option 9</a>
                <a>Option 10</a>    
            </div>
        </div>`
}
// 

async function fetchData(campaignId,sidePage) {
    
    try {
        const response = await new Promise((resolve, reject) => {
            frappe.call({
                method: 'frappe.desk.reportview.get',
                args: {
                    doctype: 'Campaign Form',
                    fields: ['name', 'title'],
                    filters: [["Campaign Form", "campaign", "=", campaignId]],
                    page_length: 'all',
                    order_by: 'modified desc',
                },
                callback: function (response) {
                    if (response && response.message && response.message.values) {
                        resolve(response.message.values);
                        // console.log(response, "response")
                    } else {
                        reject("No data found");
                    }
                }
            });
        });

       let datas = response;
        let values = response.map(item => item[1]);
        
        if (sidePage) {
            let paragraphs = values.map((value, index) => `<p class="horizontal-paragraph" data-index="${index}"><span class="bold">${value}</span></p>`).join('');
            // console.log(paragraphs)
            sidePage.innerHTML = `
                <style>
                    .horizontal-container {
                        white-space: nowrap; 
                        font-size: 0;
                    }
                    .horizontal-paragraph {
                        display: inline-block; 
                        margin-right: 20px;
                        vertical-align: top; 
                        font-size: 14px; 
                        line-height: 1.5;
                        cursor: pointer; /* Add cursor pointer to indicate clickable */
                    }
                     
                    .horizontal-paragraph:not(:last-child) {
                        margin-right: 30px;
                    }
                    .horizontal-paragraph p {
                        margin: 0; 
                        color: #333;
                    }
                    .data-inputs {
                        margin-top: 10px;
                    }
                    .data-inputs input {
                        display: block;
                        margin-bottom: 5px;
                    }
                    .clicked-data {
                        margin-top: 10px;
                        font-weight: bold;
                    }
                     .horizontal-paragraph.active {
                            font-weight: bold; 
                            border-bottom: 1.5px solid black;
                        }
                    .horizontal-paragraph:not(.active) {
                    color: #888;
                    }
                    @keyframes fadeIn {
                        from { opacity: 0; }
                        to { opacity: 1; }
                        }
                        #check-error{
                            margin-top:-3px
                        }
                        .stepper {
                            display: flex;
                            justify-content: space-between;
                            align-items: center; 
                            padding: 7px;
                            margin-bottom: 7px;
                            border-radius: 10px;
                            background-color: #fff;
                        }

                        .step {
                            width: 30px;
                            height: 30px;
                            line-height: 25.5px;
                            border-radius: 50%;
                            background-color: #ccc;
                            color: #333;
                            font-weight: bold;
                            cursor: pointer;
                            transition: background-color 0.3s, color 0.3s, transform 0.3s, border-color 0.3s;
                            position: relative;
                            z-index: 1;
                            border: 2px solid #ccc;
                            text-align: center;
                        }

                        .step.active{
                            background-color: #4CAF50;
                            color: white;
                            transform: scale(1.1);
                            border-color: #4CAF50;
                        }

                        .step.completed {
                            background-color: #4CAF50;
                            color: white;
                            border-color: #4CAF50;
                            text-align: center;
                        }

                        .line {
                            height: 2px;
                            background-color: #ccc;
                            flex: 1;
                            margin: 0 10px;
                            position: relative;
                            z-index: 0;
                        }

                        .step-content {
                            display: none;
                            padding: 7px;
                            text-align: left;
                        }

                        .step-content.active {
                            display: block;
                        }

                        .navigation {
                            display: flex;
                            justify-content: space-between;
                            margin-top: 30px;
                        }

                        button {
                            padding: 5px 10px;
                            border: none;
                            border-radius: 5px;
                            background-color: #4CAF50;
                            color: white;
                            font-size: 16px;
                            cursor: pointer;
                            transition: background-color 0.3s;
                        }

                        button:hover {
                            background-color: #45a049;
                        }

                        button:disabled {
                            background-color: #ccc;
                            cursor: not-allowed;
                        }
                      .form_con_data {
                            min-height: 270px;
                            height: 270px;
                            overflow-y: scroll;
                        }
    
                </style>
                   <div class="horizontal-container">${paragraphs}</div>
                     <div id="success_message" style="display: none; padding:4px; text-align: center; background-color: #2ecc71; color: white; border-radius: 10px; font-size: 15px;">
                            <svg xmlns="http://www.w3.org/2000/svg" height="1" viewBox="0 0 24 24" style="fill: white; margin-bottom: 10px;">
                                <path d="M0 0h24v24H0z" fill="none"/>
                                <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
                            </svg>
                            Form submitted successfully!
                        </div>
                      
                    <div id="form-container"></div>
                    `;
            const horizontalParagraphs = sidePage.querySelectorAll('.horizontal-paragraph');
            // console.log(horizontalParagraphs)
            horizontalParagraphs[0].classList.add('active')
            // cam_from_builder(0,datas)
            cam_from_builder(datas,0,'#form-container')

            horizontalParagraphs.forEach((paragraph, index) => {
                paragraph.addEventListener('click', async (event) => {
                    event.stopPropagation(); // prevent
                    horizontalParagraphs.forEach((p) => {
                        p.classList.remove('active');
                    });
                    paragraph.classList.add('active');
                    await cam_from_builder(datas,index,'#form-container')
                });
            });
        }

    } catch (error) {
        console.error(error);
    }
}
async function  cam_from_builder(datas,index,id) {
    let tab_id;
    let form_id; 
    if (index >= 0) {
        form_id = datas[index][0]
    }
        await frappe.call({
            method: 'frappe.desk.form.load.getdoc',
            args: {
                doctype: 'Campaign Form',
                fields: ['fields'],
                name: form_id,
                order_by: 'modified desc',
            },
            callback: function (response) {
                tab_id = response.docs[0].fields;
                let sidePage = document.querySelector(id);
                if (sidePage) {
                    // console.log(tab_id);
                    let formContent = tab_id.map(item => {
                        // console.log(item.fieldname)
                        switch (item.fieldtype) {
                            case "Data":
                                return `
                             <div class="form-group">
                                    <label for="${item.label}">
                                        ${item.label} 
                                        <span class="mandatory" style="color: red;">${item.reqd === 1 ? '*' : ''}</span>
                                    </label>
                                    <input type="text" id="${item.fieldname}" name="${item.fieldname}" class="form-control"}>
                                </div>

        `; break;
                            case "Select":
                                let options = item.options.split('\n').map(option => `<option value="${option}">${option}</option>`).join('');
                                return `
            <div class="form-group">
                <label for="${item.label}">
                ${item.label}
                <span class="mandatory" style="color: red;">${item.reqd === 1 ? '*' : ''}</span>
                </label>
                <select id="${item.fieldname}" name="${item.fieldname}" class="form-control">
                    ${options}
                </select>
            </div>
        `; break;
                            case 'Date':
                                return `
            <div class="form-group">
                <label for="${item.label}">
                ${item.label}
                <span class="mandatory" style="color: red;">${item.reqd === 1 ? '*' : ''}</span>
                </label>
                <input type="date" id="${item.fieldname}" name="${item.fieldname}" class="form-control">
            </div>
        `; break;
                            case 'Int':
                                return `
            <div class="form-group">
                <label for="${item.label}">
                ${item.label}
                    <span class="mandatory" style="color: red;">${item.reqd === 1 ? '*' : ''}</span>
                </label>
                <input type="number" id="${item.fieldname}" name="${item.fieldname}" class="form-control">
            </div>
        `; break;
                            case 'Check':
                                return `
           <div class="form-group" style="display: flex; align-items: center; margin-bottom: 10px;">
                <label for="${item.fieldname}" style="display: flex; align-items: center; gap:7px">
                    ${item.label}
                    <span class="mandatory" style="color: red; margin-right:7px;">${item.reqd === 1 ? '*' : ''}</span>
                </label>
                <input type="checkbox" style="margin-top:-5px;" id="${item.fieldname}" name="${item.fieldname}" class="form-control" style="margin-left: 10px;">
            </div>

        `; break;
                            case 'Small Text':
                                return `
            <div class="form-group">
                <label for="${item.label}">
                ${item.label}
                    <span class="mandatory" style="color: red;">${item.reqd === 1 ? '*' : ''}</span>
                </label>
                <textarea id="${item.fieldname}" name="${item.fieldname}" class="form-control"></textarea>
            </div>
        `; break;
                            case 'Password':
                                return `
            <div class="form-group">
                <label for="${item.label}">
                ${item.label}
                 <span class="mandatory" style="color: red;">${item.reqd === 1 ? '*' : ''}</span>
                </label>
                <input type="password" id="${item.fieldname}" name="${item.fieldname}" class="form-control">
            </div>
        `; break;

                            // Add more cases as needed for different field types
                            default:
                                return `
           <div>No Data Avilabel</div>
        `;
                        }
                    }).join('');
                    sidePage.innerHTML = `
                    <form id="custom_form">
                  <div class="containers">
                            <div class="stepper">
                                <div class="step" data-step="1">1</div>
                                <div class="line"></div>
                                <div class="step" data-step="2">2</div>
                            </div>
                            <div class="content">
                                <div class="step-content form_con_data" data-step="1">
                                     ${formContent}
                                </div>
                                <div class="step-content form_con_data" data-step="2">
                                <div class="p-2">
  <FormControl
    type="select"
    :options="[
      {
        label: 'One',
        value: '1',
      },
      {
        label: 'Two',
        value: '2',
      },
      {
        label: 'Three',
        value: '3',
      },
    ]"
    size="sm"
    variant="subtle"
    placeholder="Placeholder"
    :disabled="false"
    label="Label"
    v-model="selectValue"
  />
</div>
                                     <div class="form-group">
                                        <label for="next_follow_up">
                                        Next Follow Up 
                                        </label>
                                        <input type="date" id="next_follow_up" name="next_follow_up" class="form-control">
                                    </div>
                                     <div class="form-group">
                                        <label for="ir">
                                        IR
                                        <span class="mandatory" style="color: red;">*</span>
                                        </label>
                                        <select id="ir" name="ir" class="form-control">
                                        <option>select</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label for="dr">
                                        DR
                                        <span class="mandatory" style="color: red;">*</span>
                                        </label>
                                        <select id="dr" name="dr" class="form-control">
                                        <option>select</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label for="sub_dr">
                                        Sub DR
                                        <span class="mandatory" style="color: red;">*</span>
                                        </label>
                                        <select id="sub_dr" name="sub_dr" class="form-control">
                                        <option>select</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                           
                        </div>
                       <div class="navigation">
                                <button id="prevBtn">Previous</button>
                                <button id="nextBtn">Next</button>
                         </div>
                    </form>`;
                } else {
                    console.error('Element with class "clicked-data" not found.');
                }
            }
        });
        // 
        frappe.call({
            method:"suvaidyam.services.apis.get_ir",
            args:{},
            callback:function(response){
                response.message?.map((item)=>{
                    const option = document.createElement('option');
                    option.value = item.name;
                    option.textContent = item.name1;
                    document.getElementById('ir').appendChild(option);
                })
            }
        });

        // 
        frappe.call({
            method:"suvaidyam.services.apis.get_dr",
            args:{},
            callback:function(response){
                response.message?.map((item)=>{
                    const option = document.createElement('option');
                    option.value = item.name;
                    option.textContent = item.name1;
                    document.getElementById('dr').appendChild(option);
                })
            }
        })

        // { ======== Steper ========

        let currentStep = 1;

        document.getElementById('prevBtn').addEventListener('click', function () {
            changeStep(-1);
        });

        document.getElementById('nextBtn').addEventListener('click', function () {
            changeStep(1);
        });
        function showStep(step) { 
            const steps = document.querySelectorAll('.step');
            const contents = document.querySelectorAll('.step-content');
            steps.forEach((el) => el.classList.remove('active'));
            contents.forEach((el) => el.classList.remove('active'));
            document.querySelector(`.step[data-step="${step}"]`).classList.add('active');
            document.querySelector(`.step-content[data-step="${step}"]`).classList.add('active');
            document.getElementById('prevBtn').disabled = step === 1;
            document.getElementById('nextBtn').innerText = step === steps.length ? 'Submit' : 'Next';
            // Add completed class to previous step when moving forward
            if (step > 1) {
                document.querySelector(`.step[data-step="${step - 1}"]`).classList.add('completed');
            }
        }

        function changeStep(stepChange) {
            const steps = document.querySelectorAll('.step');
            currentStep += stepChange;
            if (currentStep > steps.length) {
                // Handle form submission
                alert('Form submitted!');
                currentStep = steps.length; // Reset to the last step
                return;
            }
            showStep(currentStep);
        }
        showStep(1);
        // ======== Steper ========   } 


        // Loop through tab_id and attach a click event listener to the button
        const allValues = [];
        document.querySelector('#custom_submit_btn')?.addEventListener('click', () => {
            let isValid = true;
            allValues.length = 0; // Reset the array
            tab_id.forEach((field_id) => {
                // console.log(field_id)
                const inputField = document.getElementById(`${field_id.fieldname}`);
                let valueToAdd;
                if (inputField.type === 'checkbox') {
                    valueToAdd = inputField.checked;
                } else {
                    valueToAdd = inputField.value;
                }
                allValues.push({ [inputField.name]: valueToAdd });
                const errorMessage = document.getElementById(`${field_id.fieldname}-error`);
                if (errorMessage) {
                    errorMessage.parentNode.removeChild(errorMessage);
                }
                // Function to validate password
                function validatePassword(password) {
                    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/;
                    return passwordPattern.test(password);
                }
                // Basic validation for non-empty fields
                if ((inputField.type === 'checkbox' && !inputField.checked) || (inputField.type !== 'checkbox' && !valueToAdd.trim())) {
                    if (field_id.reqd === 1) {
                        isValid = false;
                        const errorMessage = document.createElement('div');
                        errorMessage.textContent = `${field_id.fieldname} is required.`;
                        errorMessage.id = `${field_id.fieldname}-error`;
                        errorMessage.style.color = 'red';
                        errorMessage.style.fontSize = '0.875em';
                        inputField.parentNode.appendChild(errorMessage);
                    }
                }
                else if (inputField.type === 'password' && !validatePassword(valueToAdd)) {
                    isValid = false;
                    const errorMessage = document.createElement('div');
                    errorMessage.textContent = `Password must follow this format: Test@123`;
                    errorMessage.id = `${field_id.fieldname}-error`;
                    errorMessage.style.color = 'red';
                    errorMessage.style.fontSize = '0.875em';
                    inputField.parentNode.appendChild(errorMessage);
                }
            });
            if (isValid) {
                const successMessage = document.getElementById('success_message');
                successMessage.style.display = 'block';
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 1000);
                // console.log(allValues);
                // Reset input fields
                tab_id.forEach((field_id) => {
                    const inputField = document.getElementById(`${field_id.fieldname}`);
                    if (inputField.type === 'checkbox') {
                        inputField.checked = false;
                    } else {
                        inputField.value = '';
                    }
                });
                console.log('All fields are valid.');
            } else {
                alert('Please fill in all required fields.');
            }
        });
}

async function call_popup (frm,id) {
    if (!$(id).length) {
        await $('body').append(`
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <div id="customPopup" class="custom-popup card">
        <button type="button" class="close" id="closePopup" aria-label="Close">
                <span aria-hidden="true">&times;</span>
        </button>
        <div class="custom-popup-body d-flex flex-column align-items-center pt-1">
                <div class="bg-success rounded-circle d-flex align-items-center justify-content-center mb-1" style="width: 40px; height: 40px;">
                    <span class="text-white display-5">${frm?.doc?.first_name?.split('')[0]}</span>
                </div>
                <p class="mb-0 font-weight-bold">${frm?.doc?.first_name + ' ' + frm?.doc?.last_name}</p>
                <p class="text-muted">Mobile ${frm?.doc?.phone_number}</p>
           
            <div class="d-flex justify-content-around mt-1" role="group">
                <button type="button" class="btn btn-light rounded-circle mx-2"><i class="fa fa-microphone"></i></button>
                <button type="button" class="btn btn-light rounded-circle mx-2"><i class="fa fa-volume-up"></i></button>
            </div>
            <div class="pt-3">
                <div id="callend" class="bg-danger btn rounded-circle d-flex align-items-center justify-content-center" style="width: 35px; height: 35px;">
                    <i class="fa fa-phone text-white display-4"></i>
                </div>
            </div>
        </div>
    </div>
    
            <style>
                #closePopup{
                    position: absolute;
                }
                .custom-popup {
                    width:260px;
                    height:210px;
                    position: fixed;
                    bottom: 8px;
                    right: 8px;
                    margin: 0;
                    padding: 10px;
                    background: white;
                    border: 1px solid #ccc;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                    z-index: 1050; 
                    display: none;
                }
                .custom-popup-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 1px solid #eee;
                    // padding-bottom: 10px;
                    margin-bottom: 10px;
                }
                .custom-popup-footer {
                    display: flex;
                    justify-content: flex-end;
                    border-top: 1px solid #eee;
                    padding-top: 10px;
                    margin-top: 10px;
                }
            </style>
        `);
    }
    $('#closePopup , #callend').off('click').on('click', function () {
        $('#customPopup').hide();
        frm.refresh();
    });
}

function inbound(params) {
    return `
       <table class="table">
        <thead>
            <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
            </tr>
        </thead>
        <tbody>
            <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            </tr>
            <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
            </tr>
            <tr>
            <th scope="row">3</th>
            <td>Larry</td>
            <td>the Bird</td>
            <td>@twitter</td>
            </tr>
        </tbody>
        </table>
        `
}
function outbound(params) {
    return `
    <table class="table">
     <thead>
         <tr>
         <th scope="col">#</th>
         <th scope="col">First</th>
         <th scope="col">Last</th>
         <th scope="col">Handle</th>
         </tr>
     </thead>
     <tbody>
         <tr>
         <th scope="row">1</th>
         <td>Mark</td>
         <td>Otto</td>
         <td>@mdo</td>
         </tr>
         <tr>
         <th scope="row">2</th>
         <td>Jacob</td>
         <td>Thornton</td>
         <td>@fat</td>
         </tr>
         <tr>
         <th scope="row">3</th>
         <td>Larry</td>
         <td>the Bird</td>
         <td>@twitter</td>
         </tr>
     </tbody>
     </table>
     `
}

