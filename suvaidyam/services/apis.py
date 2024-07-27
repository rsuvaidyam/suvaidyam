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