# git-formation

Here you'll learn how to do a basic rebase.

- run `git rebase main`
- resolve conflicts as they come up (keep the changes from `exo/rebase-basic`)
- run `git rebase --continue` between each commit to go to the next one
- run `git rebase --abort` to abandon the rebase if you mess up

You can then `git push --force-with-lease` to reflect your changes on the repo.

Feel free to ask me any questions if you're struggling or need an explanation!

## What is a rebase?

Imagine that you have a `main` branch and a `dev` branch. `dev` is based off of `main`.  
If you push more commits to `main`, the two branches will have diverged. When the time comes to merge `main` and `dev`, there might be conflicts since neither branch has all the data of the other.

`git rebase` allows you to change the base of a branch (RE-base), incorporating any changes introduced to the base branch (here it is `main`).

For example, if we run `git rebase main dev`, what happens is:

- git finds the most recent commit in common between `main` and `dev`
- git takes every commit between that commit in common and the tip of `dev`, and replays\* them on top of `main`
- every time a commit from `dev` is replayed on top of `main`, git checks for conflicts and prompts the user to resolve them
- once every conflict has been resolved, the user can run `git rebase --continue` to move to the next commit to replay

\* "replaying a commit on `main`" here means "pretending like we're pushing an exact copy of a commit at the tip of the `main` branch and seeing if there are any conflicts"

In this example, once the rebase is complete, git will take the resulting string of commits (every commit replayed on top of `main`) and will save this as the new `dev` branch.

See the diagram below for a more visual representation of a `git rebase`:  
[Rebase diagram](https://drive.google.com/file/d/1OGEhL3sN1g1eiqL4ECTJbySF9fRS32sa/view)

Once this is done, the `dev` branch will have its history be fully compatible with `main`. If we then run `git merge main dev`, it will do a fast-forward merge, meaning there will be no conflicts.

## Why use rebase and not merge?

You might be familiar with `git merge` as a way of combining changes from multiple branches.

`git merge main dev` works by:

- finding every commit starting from the tip of the `dev` branch that is not on `main`
- replaying these commits on top of `main`
- creating a merge commit to deal with any conflicts if applicable.
- pushing all these commits to `main`

There are a few downsides to this:

- every time you merge, there is a merge commit. If you merge often, you'll often have random merge commits that serve little to no purpose
- your git history is not linear (hence the merge commits)
- you have to deal with conflicts when you're ready to merge everything together. It can be useful to resolve conflicts little by little, in advance of merging.
- you have to deal with every conflict at the same time. Everyone hates seeing "168 conflicts unresolved" when merging

`git rebase` allows you to keep a clean, linear git history. You deal with conflicts with each commit as they come, not all at once. Every merge is a fast-forward, so there are (almost) never any bad surprises.
