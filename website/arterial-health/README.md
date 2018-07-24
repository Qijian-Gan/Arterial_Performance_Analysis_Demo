# Arterial Health Repo
This repository contains the source for the [arterial health website](arterial-health-website.s3-website.us-west-2.amazonaws.com), as well as the supporting lambda functions and aws configuration that maintian the relevant API and CodePipeline.

## Goal
The purpose of this website is to provide a user interface for selecting intersections and then displaying graphs of metrics pertaining to selected intersections.

## Description
Our website allows user to select intersections by clicking on them or searching their street names or ID's in the search bar. Users can then switch over to the health tab, and view statistics on various metrics of the intersections they've selected.

## Details
Arterial health is a statically hosted website, and has no supporting web framework. It is hosted by the AWS S3 webhosting service in the [arterial-health](https://console.aws.amazon.com/s3/buckets/arterial-health-website/?region=us-west-2#) bucket. Its service is provided by two AWS Lambdas, [one](https://us-west-2.console.aws.amazon.com/lambda/home?region=us-west-2#/functions/arterial-health-website-update-S3) to format updates to the [supporting data bucket](https://us-west-2.console.aws.amazon.com/s3/buckets/aggregate-health-metrics/?region=us-west-2), and [one](https://us-west-2.console.aws.amazon.com/lambda/home?region=us-west-2#/functions/arterial-health-website-request) to handle incoming requests from the website.

Attached to this repo is a codepipeline which listens to events altering the `master` reference. Pushes which update master will trigger a [CodePipeline](https://us-west-2.console.aws.amazon.com/codepipeline/home?region=us-west-2#/view/ArterialHealthBuildPipeline) to build and deploy the project which includes:

- Zipping the Lambda handler source files into their deployment packages
- Syncing the master branch with the host bucket
- Requesting the Lambdas to update their sources to reflect the new deployment packages

In this way, pushes to the master branch should be enough to deploy changes to the live version of the website. For features that are not yet ready for live, consider working on the `dev` branch instead. If you must make a change that is not supported by the CodePipeline, consider adding that behavior to the buildspec to automate it in the future.
