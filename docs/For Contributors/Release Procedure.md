# Release procedure

## Merging Prs

Each pr is merged upon `dev` branch. Any feature branch should be generated from it. Hotfixes can either use `master` or `dev` branch depending whether the feature is released or not.

## Hotfixes from master

If a hotfix is needed to be generated from `master` the changed should be backmerged back to `dev` as well.

## Release

## Bump version:

### Checkout dev
```
git checkout dev
```

## Bump version:

```
# PATCH (1.0.0 → 1.0.1)
npm version patch

# Minor (1.0.0 → 1.1.0)
npm version minor

# Major (1.0.0 → 2.0.0)
npm version major
```

## Commit package.json

```
git add .
git commit -am "Bump Version"
```

## Push Dev
```
git push origin dev
```

## Merge dev -> master

From `dev` merge into master:

```
git checkout dev
git pull origin dev
git checkout master
git pull origin master
git merge development
```

## Push master

```
git push origin master
```
