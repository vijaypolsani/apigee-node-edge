<h1>* APIGEE Edge Node Deployment which would expose the RESTFul service to customers*</h1>

The Apigee Edge Node deployment is the simplest solution wherein a Node Application could be deployed inthat APIGEE Edge runtime.

The Node Edge deployment can use the BAAS too for any data requirements and can be scaled according to the needs based on the  worker
 thread configurations. 

APIGEE edge deployment is a bit tricky and needs lot more detailed documented analysis.
1. The node modules are deployed as zip files.
2. The ES5 compatability only exists and new lambda based assignments are not accepted.
3. Editing on the UI does not always work and someone need to do it commandline outside of APIGEE and redeploy. 
The redeployment automatically picks the newer version

* Command line deployment 
<h3>Deploy the Node App</h3> 
apigeetool deploynodeapp -u <username> -p <password> --organization <org.name> -e dev -n /ottoassets -d . -b /ottoassets
<h3>Deploy the Proxy App</h3> 
1. Go to the root level of the application (apiproxy)
2. Perform the below command
apigeetool deployproxy -u <username> -p <password> --organization autodesk-eis-np -e dev -n ottoassets -d .

** Deployment would show that the Node is the runtime as below.
![Alt text](/ApigeeEdge.png?raw=true "APIGEE Edge Deployment")
