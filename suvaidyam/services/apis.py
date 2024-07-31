import frappe

@frappe.whitelist()
def get_campaign_name(id):
    return frappe.get_all('Campaign',fields=['name','name1'])

@frappe.whitelist()
def get_ir():
    return frappe.get_all('IR',fields=['name','name1'])

@frappe.whitelist()
def get_dr():
    return frappe.get_all('DR',fields=['name','name1'])

@frappe.whitelist()
def get_sub_dr():
    data = frappe.db.get_list('DS', fields=['name', 'name1'])
    return data

@frappe.whitelist()
def create_cam_form_data(item):
    item = json.loads(item)
    # create a new document
    doc = frappe.new_doc('Campaign Form Data')
    doc.form = item.get('form',None)
    doc.campaign = item.get('campaign', None)
    doc.data = item.get('data', None)
    doc.state = item.get('state', None)
    doc.centre = item.get('centre', None)
    doc.beneficiary = item.get('beneficiary', None)
    doc.next_follow_up = item.get('next_follow_up', None)
    doc.ir = item.get('ir', None)
    doc.disposition = item.get('dr', None)
    doc.disposition_subset = item.get('sub_dr', None)
    doc.insert()
 
@frappe.whitelist()
def campaign_get():
    sql = f"""
        SELECT
            _camp.name1 as campaign_name,
            _camp.name as campaign_id,
            (SELECT COUNT(DISTINCT beneficiary) FROM `tabChildBeneficiary` WHERE parent = _camp.name) as beneficiary_count,
            (SELECT COUNT(name) FROM `tabTask` WHERE campaign = _camp.name) as task_count,
            (SELECT COUNT(name) FROM `tabCall Logs` WHERE campaign = _camp.name AND call_type = 'Inbound') as call_in_count,
            (SELECT COUNT(name) FROM `tabCall Logs` WHERE campaign = _camp.name AND call_type = 'Outbound') as call_out_count
        FROM
            `tabCampaign` AS _camp
    """
    return frappe.db.sql(sql, as_dict=True)

 
@frappe.whitelist()
def task_get():
    sql = f"""
         SELECT 
              _task.name as task_id ,
            _task.name1 as task_name ,
            _task.campaign as task_campaign,
            _task.agent as task_agent,
            _task.due_date as task_due,
            (SELECT COUNT(DISTINCT beneficiary) FROM `tabChildBeneficiary` WHERE parent = _task.name) as beneficiary_count
         FROM 
                `tabTask` AS _task
    """
    return frappe.db.sql(sql, as_dict=True)



 