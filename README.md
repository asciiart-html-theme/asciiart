# AsciiArt

A fully responsive, customizable HTML/CSS theme inspired by the charm of 7-bit ASCII art.

## Setup using gitlab npm

## Genetate gitlab pat

The npm repository is private, therefore you need a **Personal Access Token (PAT)** to access it.

1. Go to GitLab → **User Settings → Access Tokens**
2. Create a token with the following scopes:
   - `read_api`
   - `read_package_registry`
3. Copy the generated token (you won’t see it again)

Save into `NPM_TOKEN` env variable.

## Add `.npmrc`

Create the following `.npmrc` replace the `<your_token>` with gitlab pat.
```
@pc-magas/asciiart:registry=https://gitlab.com/api/v4/projects/80429178/packages/npm/
//gitlab.com/api/v4/projects/80429178/packages/npm/:_authToken=${NPM_TOKEN}
```

## Install package

Now you can install the package using npm:

```
export NPM_TOKEN=your_gitlab_pat
npm install @pc-magas/asciiart-html-theme
```

# Release package

## Checkout master

```
git checkout master
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

# Commit package.json and push

```
git add package.json
git push origin master
```


## Notes

- Make sure your `.npmrc` file is **not committed** to version control (add it to `.gitignore`)
- If you get a `401 Unauthorized` error, double-check your token permissions
- Tokens may expire depending on your GitLab settings
