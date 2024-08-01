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
  
    query_conditions = ''
    
    if param1:
        query_conditions = f"WHERE _camp.state= '{param1}'"

    if param2:   
         query_conditions = f"WHERE _camp.centre = '{param2}'"

    # if param3:
    #         query_conditions = f"WHERE task_agent.agent = '{param3}'"
 
    
    sql = f"""
        SELECT
            _camp.name1 as campaign_name,
            _camp.name as campaign_id,
            (SELECT COUNT(DISTINCT beneficiary) FROM `tabChildBeneficiary` WHERE parent = _camp.name) as beneficiary_count,
            (SELECT COUNT(name) FROM `tabTask` WHERE campaign = _camp.name) as task_count,
              (SELECT GROUP_CONCAT( agent) FROM `tabTask` WHERE campaign = _camp.name) AS task_agent, 
            (SELECT COUNT(name) FROM `tabCall Logs` WHERE campaign = _camp.name AND call_type = 'Inbound') as call_in_count,
            (SELECT COUNT(name) FROM `tabCall Logs` WHERE campaign = _camp.name AND call_type = 'Outbound') as call_out_count
        FROM
            `tabCampaign` AS _camp 
        {query_conditions}
    """
    return frappe.db.sql(sql, as_dict=True)


 



 