import processpal


pp = processpal.init()

ws = pp.workspaces()
wf = pp.workflows()

workspace_owner = "RsTn3eNbZJf3uNf2N"

ws_list = ws.getWorkspaceList(workspace_owner)

print(dir(ws_list))
for workspace in ws_list:
    print workspace
    wf_list = wf.getWorkflows( workspace.get("_id") )
    for workflow in ws_list:
        print workflow.get("name")
