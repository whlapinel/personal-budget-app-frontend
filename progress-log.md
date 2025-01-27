
## 4/26/24
- Successfully deployed using docker compose!!

## 4/20/24
- Resumed work on this yesterday. Spent a lot of hours containerizing the app. FINALLY was able to run containers of the backend and frontend (separately). Still using the local mariadb server so next steps include pulling a mariadb image and mounting a volume for data persistence, then using docker-compose to create a multi-container application. Then I can finally deploy with (hopefully) relative ease compared with installing all the dependencies manually on the droplet.  WOW I really struggled with that one. I probably should have done some really basic examples first. That's what impatience gets you. 

the thing I was missing from my "docker run" command that if I had learned earlier would have saved me a lot of time... 

--network="host" 

## 3/29/24
- This morning I was rethinking this again, the topic of whether to eliminate the time component of 'assignments'.  I realized my difficulty was stemming from how I was recording assignments. There should only be one assignment for each category and month, but I didn't put that constraint on the table nor did I realize it would be necessary. If I put that constraint on, where there's a single row and only one row for each category for each month containing the balance or 'assigned amount', it becomes conceptually easier to understand how everything fits together. I think I'll retain the time component and revise the assignments table, calling it the monthly_budget table instead.

## 3/28/24
- Things began to feel really complicated yesterday as I was trying to figure out how YNAB calculates unassigned funds for future and past months.  This would require looking at previous month's assignments and expenditures for each category and subtracting them from the funds available. I had trouble envisioning the implementation of this, and as I realized I would also need to figure out how YNAB deals with overspending, I began wondering if this would be unnecessarily complex.  Maybe I could just completely remove the time component from assignments and simply add a 'balance' field to each category. So rather than have a 'virtual-envelope', a sort of 'mini-account' for each month for each category, I only need an envelope for each category. I will still need to deal with overspending, where a user has assigned more than they have due to overspending, so there is still plenty of challenge to this approach.

Then, I could add the more traditional type of budgeting, where you can enter projected monthly income and see how this will stack up against your projected expenditures (called 'goals' in my own schema, currently only 'monthly' and 'onetime' periodicities allowed, but this should suffice).

## 3/27/24
- Been working on a lot without updating here.  Major breakthrough today when I realized it will be a lot easier to do all the crunching on the backend and put as little of the calculation on the frontend as possible. Originally I had a route for each table basically. But today I created a MonthlyBudget struct and a monthly_budget route handler to provide all the necessary data for the budget page in one package instead of making the BFF do it and wasting a lot of roundtrips in the process.

## 3/18/24

- FIXME: email cookie should not be stored separately from session, right??  Why did I do that?
- FIXME: transactions page not showing
- FIXME: other random issues with session management 

## 3/14/24

- FIXME: add category not working, somewhere is logging: Error 1054 (42S22): Unknown column 'user_id' in 'field list' DONE

## 3/9/24

- implement session management
- 1 minute token expiration with warning at 20 seconds left
- still need to add ability for user to refresh token ("remain signed in")
- still need to verify that user does not have dashboard access without a token (stored in cookie)
- need to somehow register "activity" so that token will be refreshed after 40 seconds of inactivity
- need to implement automatic refresh of token when 30 seconds remain and user is active 

## 3/3/24

- implement basic signup and signin functionality (email and password)
- implement JWT auth and session management
- sessions stored in cookies
- storing encrypted passwords in db
- removed "username"

## 2/29/24

- began implementing jwt authentication on Go backend. Persisted on client via local storage.
- implemented jwt authentication on POST /categories route.
- Next up: implement refresh token route on client and backend, automatically make API call from client prior to token expiration.

## 2/27/24

- removed parallel routes in dashboard and 'views' variable, changed each view to regular route segments

## 2/25/24

- Created Go backend.  Super excited to be learning Go. Successfully read dummy data from Go Backend into NextJS frontend.
- Next up: 
- [x] set up MariaDB or MySQL database locally 
- [x] implement JSON web tokens (backend)

