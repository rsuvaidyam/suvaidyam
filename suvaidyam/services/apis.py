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
def campaign_get(param1='', param2='', param3=''):
    conditions = []
    
    if param1:
        conditions.append(f"_camp.state = '{param1}'")
    if param2:
        conditions.append(f"_camp.centre = '{param2}'")
    if param3:
        conditions.append(f"_task.agent = '{param3}'")
    
    query_conditions = ''
    if conditions:
        query_conditions = 'WHERE ' + ' AND '.join(conditions)
    
    sql = f"""
        SELECT
            _camp.name1 as campaign_name,
            _camp.name as campaign_id,
            (SELECT COUNT(DISTINCT beneficiary) FROM `tabChildBeneficiary` WHERE parent = _camp.name) as beneficiary_count,
            (SELECT COUNT(name) FROM `tabTask` WHERE campaign = _camp.name) as task_count,
            (SELECT GROUP_CONCAT(agent) FROM `tabTask` WHERE campaign = _camp.name) AS task_agent, 
            (SELECT COUNT(name) FROM `tabCall Logs` WHERE campaign = _camp.name AND call_type = 'Inbound') as call_in_count,
            (SELECT COUNT(name) FROM `tabCall Logs` WHERE campaign = _camp.name AND call_type = 'Outbound') as call_out_count
        FROM
            `tabCampaign` AS _camp 
        LEFT JOIN `tabTask` AS _task ON _task.campaign = _camp.name
        {query_conditions}
        GROUP BY _camp.name1, _camp.name
    """
    return frappe.db.sql(sql, as_dict=True)

 



 