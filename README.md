# For The Record coding assignment

## Description

My submission for the For The Record coding assignment. Implements a command
line interface satisfying the requirements of the assignment.



### Installation

Requires Node.js >=10.4 for BigInt support - used for calculating large
values of the Fibonacci sequence. Could look into polyfilling if needed for
broader support.

Clone this repo, then run:

    npm install

### Running

    npm run start

### Discussion

> You have a new requirement to implement for your application: its logic
should stay exactly the same but it will need to have a different user
interface (e.g. if you wrote a web app, a different UI may be a REPL).
> 
> Please describe how you would go about implementing this new UI in your
application?
Would you need to restructure your solution in any way?

Since the logic is all contained and accessed via API (in this solution it is
internal APIs across the Typescript files, but a more robust solution may
implement this as a REST API microservice), we only need to worry about the
interface functionality. This includes the visual aspects, but also things like
input sanitation. The mechanisms by which this API is called may change
depending on the interface technology (are we using React+Redux for a web app,
a bash style command line REPL, etc), but the API logic should not need to be
altered. Microservice APIs lean heavily on the contractual aspects of API
development.

> You now need to make your application “production ready”, and deploy it so
that it can be used by customers.
> 
> Please describe the steps you’d need to take for this to happen.

As far as the code goes, the first steps towards production happen during the
development process: code review, unit/e2e/integration/etc. testing, linting.
Following this, we'd have build processes prior to production deployment which
minify, compress and obfuscate code.

We'd then need to figure out what the deployment environment requirements are.
What is the availability expectation? Anticipated load/usage? Internal
application or public facing? Disaster recovery and failover? CI/CD? These all
drive specific actions for deployment and are typically unique to each
application.

Generally, however, I'd expect the following things to be configured in a
production environment:

 - Automated service management - i.e. keep the service running in the event of
 uncaught exceptions, hardware restarts, etc.
 - Centralized error reporting and logging repositories to assist in debugging/
 profiling
 - Load balancing to remove single point of failure risk (this can double as
 disaster recovery in some cases)
 - Dynamic scaling to account for unforeseen load

> What did you think about this coding test - is there anything you’d suggest
in order to improve it?

Nice, straightforward problem which required knowledge of asynchronicity, data management, and separation of concerns.

Can't say specifcally what changes I'd make as I'm sure you have targetted the
knowledge you want to gather from this type of assessment, but maybe consider
specifying some requirements surrounding the UI?
