import uuid
import simplejson
from email.message import EmailMessage
from email.utils import make_msgid
from smtplib import SMTP_SSL as SMTP

class shared:
    def __init__(self, db):
        self.db = db

    def getWorkflowByActivityId(self, activity_id):
        activity = self.getActivityById(activity_id)
        if not activity:
            return {"error":"Not a valid activity"}
        else:
            q = """
                select
                    workflow_id,
                    workspace_id,
                    name,
                    description,
                    owner_uid,
                    ts_created,
                    ts_modified,
                    parent_workflow_id,
                    version,
                    initial_activity,
                    deployed
                from
                    tbl_workflows
                where
                    workflow_id = $workflow_id
            """
            return self.db.find_one(q, { "workflow_id": activity.get("workflow_id") })

    def getActivityById(self, activity_id):
        q = "select * from tbl_activities where activity_id = $activity_id"
        return self.db.find_one(q, {"activity_id": activity_id})

    def genUUID(self):
        return str(uuid.uuid4())


    def getConnectionsFromActivity(self, activity_id):
        q = "select * from tbl_activity_connections where source_activity_id = $activity_id"
        return self.db.find(q, {"activity_id": activity_id})

    def getRunData(self, run_id):
        data = []
        return data
        """
        cur = self.db.workflow_data.find({"runId": run_id})
        for row in cur:
            data.append(row)
        return data
        """

    # Return a single dictionary with all the submitted data for a specific run id.
    # If multiple values exist for the same key only the latest data will be returned
    def getRunDataConsolidated(self, run_id):
        q = "select * from tbl_feedback where run_id = $run_id order by ts_created desc"
        rows = self.db.find(q, {"run_id": run_id})


        result = {}
        for row in rows:
            data_arr = row.get("feedback_data")
            for key in data_arr:
                result[key] = data_arr.get(key)
            del row["feedback_data"]
            for key in row:
                result[key] = row.get(key)
        return result

    def sendMail(self, from_email, to_email, subject, body):
        msg = EmailMessage()
        msg['Subject'] = subject
        msg['From'] = from_email
        msg['To'] = to_email
        msg.set_content(body)
        #logo_cid = make_msgid()
        msg.add_alternative("""
            <html>
                <head>
                    <title>ProcessPal</title>
                </head>
                <body style="background-color:#dadada">
                    <center>
                    <div style="width:100%;max-width:900px;background-color:white;color:black;height:100%;text-align:left">
                        <img src="https://processpal.io/wp-content/uploads/2017/07/PP-Registered-Logo-only.png" style="width:200px">
                        <br>
                        <p>{body}
                        <br>
                        <br>
                        <br>
                        <br>
                    </div>
                    </center>
                </body>
            </html>

        """.format(body=body), subtype="html")
        """
        with open("pp-logo.png", 'rb') as img:
            msg.get_payload()[1].add_related(img.read(), 'image', 'png', cid=logo_cid)
        """
        with SMTP("mail.gandi.net") as s:
            s.login("info@bluemarket.io", "kzzz928as93")
            s.send_message(msg)


