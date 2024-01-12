# Docker compose files for all services
**Important:** This is the kind of all in one solution for this project.
For each service there is one compose file. Due to a quite long docker compose of ~350 it is splitted up.  

When every frontend and backend of each service needs to be deployed seperatly: 
 * have a look the corresponding service directory
 * start the frontend and backend compose files in the corresponding directories
 * further information can be found in the READMEs

## Prerequisites
Make sure to run `network_management.sh`. This script generates all needed docker networks or deletes. 

Make it executable at first:
```bash
chmod +x network_management.sh
```

Then run it:
```bash
# to generate networks
./network_management.sh -g

# to delete networks
./network_management.sh -d
```

It is also possible to run in privelged mode e. g. with sudo as prefix: `sudo ./network_management.sh -g` 

#### Why this file is needed
Since the compose files are split up the networks are having a weird name e. g. `docker_dbcheckoutnet`, this scripts prevents this naming and just creates the networks without any prefix.   
So in fact it just for personal taste and clearer network reference in the compose files.