//vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: ['.js', '.jsx']
  }
})

//tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}

//postcss.config.js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}

//package.json
{
  "name": "bratstvo-digital",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@supabase/supabase-js": "^2.45.4",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.23.1"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.1",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.32",
    "tailwindcss": "^3.4.1",
    "vite": "^5.2.0"
  }
}

//package-lock.json
{
  "name": "bratstvo-digital",
  "version": "1.0.0",
  "lockfileVersion": 3,
  "requires": true,
  "packages": {
    "": {
      "name": "bratstvo-digital",
      "version": "1.0.0",
      "dependencies": {
        "@supabase/supabase-js": "^2.45.4",
        "react": "^18.2.0",
        "react-dom": "^18.2.0",
        "react-router-dom": "^6.23.1"
      },
      "devDependencies": {
        "@vitejs/plugin-react": "^4.2.1",
        "autoprefixer": "^10.4.16",
        "postcss": "^8.4.32",
        "tailwindcss": "^3.4.1",
        "vite": "^5.2.0"
      }
    },
    "node_modules/@alloc/quick-lru": {
      "version": "5.2.0",
      "resolved": "https://registry.npmjs.org/@alloc/quick-lru/-/quick-lru-5.2.0.tgz",
      "integrity": "sha512-UrcABB+4bUrFABwbluTIBErXwvbsU/V7TZWfmbgJfbkwiBuziS9gxdODUyuiecfdGQ85jglMW6juS3+z5TsKLw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/@babel/code-frame": {
      "version": "7.29.0",
      "resolved": "https://registry.npmjs.org/@babel/code-frame/-/code-frame-7.29.0.tgz",
      "integrity": "sha512-9NhCeYjq9+3uxgdtp20LSiJXJvN0FeCtNGpJxuMFZ1Kv3cWUNb6DOhJwUvcVCzKGR66cw4njwM6hrJLqgOwbcw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-validator-identifier": "^7.28.5",
        "js-tokens": "^4.0.0",
        "picocolors": "^1.1.1"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/compat-data": {
      "version": "7.29.0",
      "resolved": "https://registry.npmjs.org/@babel/compat-data/-/compat-data-7.29.0.tgz",
      "integrity": "sha512-T1NCJqT/j9+cn8fvkt7jtwbLBfLC/1y1c7NtCeXFRgzGTsafi68MRv8yzkYSapBnFA6L3U2VSc02ciDzoAJhJg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/core": {
      "version": "7.29.0",
      "resolved": "https://registry.npmjs.org/@babel/core/-/core-7.29.0.tgz",
      "integrity": "sha512-CGOfOJqWjg2qW/Mb6zNsDm+u5vFQ8DxXfbM09z69p5Z6+mE1ikP2jUXw+j42Pf1XTYED2Rni5f95npYeuwMDQA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/code-frame": "^7.29.0",
        "@babel/generator": "^7.29.0",
        "@babel/helper-compilation-targets": "^7.28.6",
        "@babel/helper-module-transforms": "^7.28.6",
        "@babel/helpers": "^7.28.6",
        "@babel/parser": "^7.29.0",
        "@babel/template": "^7.28.6",
        "@babel/traverse": "^7.29.0",
        "@babel/types": "^7.29.0",
        "@jridgewell/remapping": "^2.3.5",
        "convert-source-map": "^2.0.0",
        "debug": "^4.1.0",
        "gensync": "^1.0.0-beta.2",
        "json5": "^2.2.3",
        "semver": "^6.3.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/babel"
      }
    },
    "node_modules/@babel/generator": {
      "version": "7.29.1",
      "resolved": "https://registry.npmjs.org/@babel/generator/-/generator-7.29.1.tgz",
      "integrity": "sha512-qsaF+9Qcm2Qv8SRIMMscAvG4O3lJ0F1GuMo5HR/Bp02LopNgnZBC/EkbevHFeGs4ls/oPz9v+Bsmzbkbe+0dUw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/parser": "^7.29.0",
        "@babel/types": "^7.29.0",
        "@jridgewell/gen-mapping": "^0.3.12",
        "@jridgewell/trace-mapping": "^0.3.28",
        "jsesc": "^3.0.2"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-compilation-targets": {
      "version": "7.28.6",
      "resolved": "https://registry.npmjs.org/@babel/helper-compilation-targets/-/helper-compilation-targets-7.28.6.tgz",
      "integrity": "sha512-JYtls3hqi15fcx5GaSNL7SCTJ2MNmjrkHXg4FSpOA/grxK8KwyZ5bubHsCq8FXCkua6xhuaaBit+3b7+VZRfcA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/compat-data": "^7.28.6",
        "@babel/helper-validator-option": "^7.27.1",
        "browserslist": "^4.24.0",
        "lru-cache": "^5.1.1",
        "semver": "^6.3.1"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-globals": {
      "version": "7.28.0",
      "resolved": "https://registry.npmjs.org/@babel/helper-globals/-/helper-globals-7.28.0.tgz",
      "integrity": "sha512-+W6cISkXFa1jXsDEdYA8HeevQT/FULhxzR99pxphltZcVaugps53THCeiWA8SguxxpSp3gKPiuYfSWopkLQ4hw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-module-imports": {
      "version": "7.28.6",
      "resolved": "https://registry.npmjs.org/@babel/helper-module-imports/-/helper-module-imports-7.28.6.tgz",
      "integrity": "sha512-l5XkZK7r7wa9LucGw9LwZyyCUscb4x37JWTPz7swwFE/0FMQAGpiWUZn8u9DzkSBWEcK25jmvubfpw2dnAMdbw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/traverse": "^7.28.6",
        "@babel/types": "^7.28.6"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-module-transforms": {
      "version": "7.28.6",
      "resolved": "https://registry.npmjs.org/@babel/helper-module-transforms/-/helper-module-transforms-7.28.6.tgz",
      "integrity": "sha512-67oXFAYr2cDLDVGLXTEABjdBJZ6drElUSI7WKp70NrpyISso3plG9SAGEF6y7zbha/wOzUByWWTJvEDVNIUGcA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-module-imports": "^7.28.6",
        "@babel/helper-validator-identifier": "^7.28.5",
        "@babel/traverse": "^7.28.6"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0"
      }
    },
    "node_modules/@babel/helper-plugin-utils": {
      "version": "7.28.6",
      "resolved": "https://registry.npmjs.org/@babel/helper-plugin-utils/-/helper-plugin-utils-7.28.6.tgz",
      "integrity": "sha512-S9gzZ/bz83GRysI7gAD4wPT/AI3uCnY+9xn+Mx/KPs2JwHJIz1W8PZkg2cqyt3RNOBM8ejcXhV6y8Og7ly/Dug==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-string-parser": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/helper-string-parser/-/helper-string-parser-7.27.1.tgz",
      "integrity": "sha512-qMlSxKbpRlAridDExk92nSobyDdpPijUq2DW6oDnUqd0iOGxmQjyqhMIihI9+zv4LPyZdRje2cavWPbCbWm3eA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-validator-identifier": {
      "version": "7.28.5",
      "resolved": "https://registry.npmjs.org/@babel/helper-validator-identifier/-/helper-validator-identifier-7.28.5.tgz",
      "integrity": "sha512-qSs4ifwzKJSV39ucNjsvc6WVHs6b7S03sOh2OcHF9UHfVPqWWALUsNUVzhSBiItjRZoLHx7nIarVjqKVusUZ1Q==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-validator-option": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/helper-validator-option/-/helper-validator-option-7.27.1.tgz",
      "integrity": "sha512-YvjJow9FxbhFFKDSuFnVCe2WxXk1zWc22fFePVNEaWJEu8IrZVlda6N0uHwzZrUM1il7NC9Mlp4MaJYbYd9JSg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helpers": {
      "version": "7.29.2",
      "resolved": "https://registry.npmjs.org/@babel/helpers/-/helpers-7.29.2.tgz",
      "integrity": "sha512-HoGuUs4sCZNezVEKdVcwqmZN8GoHirLUcLaYVNBK2J0DadGtdcqgr3BCbvH8+XUo4NGjNl3VOtSjEKNzqfFgKw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/template": "^7.28.6",
        "@babel/types": "^7.29.0"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/parser": {
      "version": "7.29.2",
      "resolved": "https://registry.npmjs.org/@babel/parser/-/parser-7.29.2.tgz",
      "integrity": "sha512-4GgRzy/+fsBa72/RZVJmGKPmZu9Byn8o4MoLpmNe1m8ZfYnz5emHLQz3U4gLud6Zwl0RZIcgiLD7Uq7ySFuDLA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/types": "^7.29.0"
      },
      "bin": {
        "parser": "bin/babel-parser.js"
      },
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/@babel/plugin-transform-react-jsx-self": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-react-jsx-self/-/plugin-transform-react-jsx-self-7.27.1.tgz",
      "integrity": "sha512-6UzkCs+ejGdZ5mFFC/OCUrv028ab2fp1znZmCZjAOBKiBK2jXD1O+BPSfX8X2qjJ75fZBMSnQn3Rq2mrBJK2mw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-plugin-utils": "^7.27.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/plugin-transform-react-jsx-source": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-react-jsx-source/-/plugin-transform-react-jsx-source-7.27.1.tgz",
      "integrity": "sha512-zbwoTsBruTeKB9hSq73ha66iFeJHuaFkUbwvqElnygoNbj/jHRsSeokowZFN3CZ64IvEqcmmkVe89OPXc7ldAw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-plugin-utils": "^7.27.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/template": {
      "version": "7.28.6",
      "resolved": "https://registry.npmjs.org/@babel/template/-/template-7.28.6.tgz",
      "integrity": "sha512-YA6Ma2KsCdGb+WC6UpBVFJGXL58MDA6oyONbjyF/+5sBgxY/dwkhLogbMT2GXXyU84/IhRw/2D1Os1B/giz+BQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/code-frame": "^7.28.6",
        "@babel/parser": "^7.28.6",
        "@babel/types": "^7.28.6"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/traverse": {
      "version": "7.29.0",
      "resolved": "https://registry.npmjs.org/@babel/traverse/-/traverse-7.29.0.tgz",
      "integrity": "sha512-4HPiQr0X7+waHfyXPZpWPfWL/J7dcN1mx9gL6WdQVMbPnF3+ZhSMs8tCxN7oHddJE9fhNE7+lxdnlyemKfJRuA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/code-frame": "^7.29.0",
        "@babel/generator": "^7.29.0",
        "@babel/helper-globals": "^7.28.0",
        "@babel/parser": "^7.29.0",
        "@babel/template": "^7.28.6",
        "@babel/types": "^7.29.0",
        "debug": "^4.3.1"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/types": {
      "version": "7.29.0",
      "resolved": "https://registry.npmjs.org/@babel/types/-/types-7.29.0.tgz",
      "integrity": "sha512-LwdZHpScM4Qz8Xw2iKSzS+cfglZzJGvofQICy7W7v4caru4EaAmyUuO6BGrbyQ2mYV11W0U8j5mBhd14dd3B0A==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-string-parser": "^7.27.1",
        "@babel/helper-validator-identifier": "^7.28.5"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@esbuild/aix-ppc64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/aix-ppc64/-/aix-ppc64-0.21.5.tgz",
      "integrity": "sha512-1SDgH6ZSPTlggy1yI6+Dbkiz8xzpHJEVAlF/AM1tHPLsf5STom9rwtjE4hKAF20FfXXNTFqEYXyJNWh1GiZedQ==",
      "cpu": [
        "ppc64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "aix"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/android-arm": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/android-arm/-/android-arm-0.21.5.tgz",
      "integrity": "sha512-vCPvzSjpPHEi1siZdlvAlsPxXl7WbOVUBBAowWug4rJHb68Ox8KualB+1ocNvT5fjv6wpkX6o/iEpbDrf68zcg==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/android-arm64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/android-arm64/-/android-arm64-0.21.5.tgz",
      "integrity": "sha512-c0uX9VAUBQ7dTDCjq+wdyGLowMdtR/GoC2U5IYk/7D1H1JYC0qseD7+11iMP2mRLN9RcCMRcjC4YMclCzGwS/A==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/android-x64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/android-x64/-/android-x64-0.21.5.tgz",
      "integrity": "sha512-D7aPRUUNHRBwHxzxRvp856rjUHRFW1SdQATKXH2hqA0kAZb1hKmi02OpYRacl0TxIGz/ZmXWlbZgjwWYaCakTA==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/darwin-arm64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/darwin-arm64/-/darwin-arm64-0.21.5.tgz",
      "integrity": "sha512-DwqXqZyuk5AiWWf3UfLiRDJ5EDd49zg6O9wclZ7kUMv2WRFr4HKjXp/5t8JZ11QbQfUS6/cRCKGwYhtNAY88kQ==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/darwin-x64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/darwin-x64/-/darwin-x64-0.21.5.tgz",
      "integrity": "sha512-se/JjF8NlmKVG4kNIuyWMV/22ZaerB+qaSi5MdrXtd6R08kvs2qCN4C09miupktDitvh8jRFflwGFBQcxZRjbw==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/freebsd-arm64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/freebsd-arm64/-/freebsd-arm64-0.21.5.tgz",
      "integrity": "sha512-5JcRxxRDUJLX8JXp/wcBCy3pENnCgBR9bN6JsY4OmhfUtIHe3ZW0mawA7+RDAcMLrMIZaf03NlQiX9DGyB8h4g==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/freebsd-x64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/freebsd-x64/-/freebsd-x64-0.21.5.tgz",
      "integrity": "sha512-J95kNBj1zkbMXtHVH29bBriQygMXqoVQOQYA+ISs0/2l3T9/kj42ow2mpqerRBxDJnmkUDCaQT/dfNXWX/ZZCQ==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/linux-arm": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-arm/-/linux-arm-0.21.5.tgz",
      "integrity": "sha512-bPb5AHZtbeNGjCKVZ9UGqGwo8EUu4cLq68E95A53KlxAPRmUyYv2D6F0uUI65XisGOL1hBP5mTronbgo+0bFcA==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/linux-arm64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-arm64/-/linux-arm64-0.21.5.tgz",
      "integrity": "sha512-ibKvmyYzKsBeX8d8I7MH/TMfWDXBF3db4qM6sy+7re0YXya+K1cem3on9XgdT2EQGMu4hQyZhan7TeQ8XkGp4Q==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/linux-ia32": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-ia32/-/linux-ia32-0.21.5.tgz",
      "integrity": "sha512-YvjXDqLRqPDl2dvRODYmmhz4rPeVKYvppfGYKSNGdyZkA01046pLWyRKKI3ax8fbJoK5QbxblURkwK/MWY18Tg==",
      "cpu": [
        "ia32"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/linux-loong64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-loong64/-/linux-loong64-0.21.5.tgz",
      "integrity": "sha512-uHf1BmMG8qEvzdrzAqg2SIG/02+4/DHB6a9Kbya0XDvwDEKCoC8ZRWI5JJvNdUjtciBGFQ5PuBlpEOXQj+JQSg==",
      "cpu": [
        "loong64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/linux-mips64el": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-mips64el/-/linux-mips64el-0.21.5.tgz",
      "integrity": "sha512-IajOmO+KJK23bj52dFSNCMsz1QP1DqM6cwLUv3W1QwyxkyIWecfafnI555fvSGqEKwjMXVLokcV5ygHW5b3Jbg==",
      "cpu": [
        "mips64el"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/linux-ppc64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-ppc64/-/linux-ppc64-0.21.5.tgz",
      "integrity": "sha512-1hHV/Z4OEfMwpLO8rp7CvlhBDnjsC3CttJXIhBi+5Aj5r+MBvy4egg7wCbe//hSsT+RvDAG7s81tAvpL2XAE4w==",
      "cpu": [
        "ppc64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/linux-riscv64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-riscv64/-/linux-riscv64-0.21.5.tgz",
      "integrity": "sha512-2HdXDMd9GMgTGrPWnJzP2ALSokE/0O5HhTUvWIbD3YdjME8JwvSCnNGBnTThKGEB91OZhzrJ4qIIxk/SBmyDDA==",
      "cpu": [
        "riscv64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/linux-s390x": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-s390x/-/linux-s390x-0.21.5.tgz",
      "integrity": "sha512-zus5sxzqBJD3eXxwvjN1yQkRepANgxE9lgOW2qLnmr8ikMTphkjgXu1HR01K4FJg8h1kEEDAqDcZQtbrRnB41A==",
      "cpu": [
        "s390x"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/linux-x64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-x64/-/linux-x64-0.21.5.tgz",
      "integrity": "sha512-1rYdTpyv03iycF1+BhzrzQJCdOuAOtaqHTWJZCWvijKD2N5Xu0TtVC8/+1faWqcP9iBCWOmjmhoH94dH82BxPQ==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/netbsd-x64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/netbsd-x64/-/netbsd-x64-0.21.5.tgz",
      "integrity": "sha512-Woi2MXzXjMULccIwMnLciyZH4nCIMpWQAs049KEeMvOcNADVxo0UBIQPfSmxB3CWKedngg7sWZdLvLczpe0tLg==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "netbsd"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/openbsd-x64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/openbsd-x64/-/openbsd-x64-0.21.5.tgz",
      "integrity": "sha512-HLNNw99xsvx12lFBUwoT8EVCsSvRNDVxNpjZ7bPn947b8gJPzeHWyNVhFsaerc0n3TsbOINvRP2byTZ5LKezow==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "openbsd"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/sunos-x64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/sunos-x64/-/sunos-x64-0.21.5.tgz",
      "integrity": "sha512-6+gjmFpfy0BHU5Tpptkuh8+uw3mnrvgs+dSPQXQOv3ekbordwnzTVEb4qnIvQcYXq6gzkyTnoZ9dZG+D4garKg==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "sunos"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/win32-arm64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/win32-arm64/-/win32-arm64-0.21.5.tgz",
      "integrity": "sha512-Z0gOTd75VvXqyq7nsl93zwahcTROgqvuAcYDUr+vOv8uHhNSKROyU961kgtCD1e95IqPKSQKH7tBTslnS3tA8A==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/win32-ia32": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/win32-ia32/-/win32-ia32-0.21.5.tgz",
      "integrity": "sha512-SWXFF1CL2RVNMaVs+BBClwtfZSvDgtL//G/smwAc5oVK/UPu2Gu9tIaRgFmYFFKrmg3SyAjSrElf0TiJ1v8fYA==",
      "cpu": [
        "ia32"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@esbuild/win32-x64": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/@esbuild/win32-x64/-/win32-x64-0.21.5.tgz",
      "integrity": "sha512-tQd/1efJuzPC6rCFwEvLtci/xNFcTZknmXs98FYDfGE4wP9ClFV98nyKrzJKVPMhdDnjzLhdUyMX4PsQAPjwIw==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@jridgewell/gen-mapping": {
      "version": "0.3.13",
      "resolved": "https://registry.npmjs.org/@jridgewell/gen-mapping/-/gen-mapping-0.3.13.tgz",
      "integrity": "sha512-2kkt/7niJ6MgEPxF0bYdQ6etZaA+fQvDcLKckhy1yIQOzaoKjBBjSj63/aLVjYE3qhRt5dvM+uUyfCg6UKCBbA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jridgewell/sourcemap-codec": "^1.5.0",
        "@jridgewell/trace-mapping": "^0.3.24"
      }
    },
    "node_modules/@jridgewell/remapping": {
      "version": "2.3.5",
      "resolved": "https://registry.npmjs.org/@jridgewell/remapping/-/remapping-2.3.5.tgz",
      "integrity": "sha512-LI9u/+laYG4Ds1TDKSJW2YPrIlcVYOwi2fUC6xB43lueCjgxV4lffOCZCtYFiH6TNOX+tQKXx97T4IKHbhyHEQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jridgewell/gen-mapping": "^0.3.5",
        "@jridgewell/trace-mapping": "^0.3.24"
      }
    },
    "node_modules/@jridgewell/resolve-uri": {
      "version": "3.1.2",
      "resolved": "https://registry.npmjs.org/@jridgewell/resolve-uri/-/resolve-uri-3.1.2.tgz",
      "integrity": "sha512-bRISgCIjP20/tbWSPWMEi54QVPRZExkuD9lJL+UIxUKtwVJA8wW1Trb1jMs1RFXo1CBTNZ/5hpC9QvmKWdopKw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/@jridgewell/sourcemap-codec": {
      "version": "1.5.5",
      "resolved": "https://registry.npmjs.org/@jridgewell/sourcemap-codec/-/sourcemap-codec-1.5.5.tgz",
      "integrity": "sha512-cYQ9310grqxueWbl+WuIUIaiUaDcj7WOq5fVhEljNVgRfOUhY9fy2zTvfoqWsnebh8Sl70VScFbICvJnLKB0Og==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@jridgewell/trace-mapping": {
      "version": "0.3.31",
      "resolved": "https://registry.npmjs.org/@jridgewell/trace-mapping/-/trace-mapping-0.3.31.tgz",
      "integrity": "sha512-zzNR+SdQSDJzc8joaeP8QQoCQr8NuYx2dIIytl1QeBEZHJ9uW6hebsrYgbz8hJwUQao3TWCMtmfV8Nu1twOLAw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jridgewell/resolve-uri": "^3.1.0",
        "@jridgewell/sourcemap-codec": "^1.4.14"
      }
    },
    "node_modules/@nodelib/fs.scandir": {
      "version": "2.1.5",
      "resolved": "https://registry.npmjs.org/@nodelib/fs.scandir/-/fs.scandir-2.1.5.tgz",
      "integrity": "sha512-vq24Bq3ym5HEQm2NKCr3yXDwjc7vTsEThRDnkp2DK9p1uqLR+DHurm/NOTo0KG7HYHU7eppKZj3MyqYuMBf62g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@nodelib/fs.stat": "2.0.5",
        "run-parallel": "^1.1.9"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/@nodelib/fs.stat": {
      "version": "2.0.5",
      "resolved": "https://registry.npmjs.org/@nodelib/fs.stat/-/fs.stat-2.0.5.tgz",
      "integrity": "sha512-RkhPPp2zrqDAQA/2jNhnztcPAlv64XdhIp7a7454A5ovI7Bukxgt7MX7udwAu3zg1DcpPU0rz3VV1SeaqvY4+A==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/@nodelib/fs.walk": {
      "version": "1.2.8",
      "resolved": "https://registry.npmjs.org/@nodelib/fs.walk/-/fs.walk-1.2.8.tgz",
      "integrity": "sha512-oGB+UxlgWcgQkgwo8GcEGwemoTFt3FIO9ababBmaGwXIoBKZ+GTy0pP185beGg7Llih/NSHSV2XAs1lnznocSg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@nodelib/fs.scandir": "2.1.5",
        "fastq": "^1.6.0"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/@remix-run/router": {
      "version": "1.23.2",
      "resolved": "https://registry.npmjs.org/@remix-run/router/-/router-1.23.2.tgz",
      "integrity": "sha512-Ic6m2U/rMjTkhERIa/0ZtXJP17QUi2CbWE7cqx4J58M8aA3QTfW+2UlQ4psvTX9IO1RfNVhK3pcpdjej7L+t2w==",
      "license": "MIT",
      "engines": {
        "node": ">=14.0.0"
      }
    },
    "node_modules/@rolldown/pluginutils": {
      "version": "1.0.0-beta.27",
      "resolved": "https://registry.npmjs.org/@rolldown/pluginutils/-/pluginutils-1.0.0-beta.27.tgz",
      "integrity": "sha512-+d0F4MKMCbeVUJwG96uQ4SgAznZNSq93I3V+9NHA4OpvqG8mRCpGdKmK8l/dl02h2CCDHwW2FqilnTyDcAnqjA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@rollup/rollup-android-arm-eabi": {
      "version": "4.60.2",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-android-arm-eabi/-/rollup-android-arm-eabi-4.60.2.tgz",
      "integrity": "sha512-dnlp69efPPg6Uaw2dVqzWRfAWRnYVb1XJ8CyyhIbZeaq4CA5/mLeZ1IEt9QqQxmbdvagjLIm2ZL8BxXv5lH4Yw==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ]
    },
    "node_modules/@rollup/rollup-android-arm64": {
      "version": "4.60.2",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-android-arm64/-/rollup-android-arm64-4.60.2.tgz",
      "integrity": "sha512-OqZTwDRDchGRHHm/hwLOL7uVPB9aUvI0am/eQuWMNyFHf5PSEQmyEeYYheA0EPPKUO/l0uigCp+iaTjoLjVoHg==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ]
    },
    "node_modules/@rollup/rollup-darwin-arm64": {
      "version": "4.60.2",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-darwin-arm64/-/rollup-darwin-arm64-4.60.2.tgz",
      "integrity": "sha512-UwRE7CGpvSVEQS8gUMBe1uADWjNnVgP3Iusyda1nSRwNDCsRjnGc7w6El6WLQsXmZTbLZx9cecegumcitNfpmA==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ]
    },
    "node_modules/@rollup/rollup-darwin-x64": {
      "version": "4.60.2",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-darwin-x64/-/rollup-darwin-x64-4.60.2.tgz",
      "integrity": "sha512-gjEtURKLCC5VXm1I+2i1u9OhxFsKAQJKTVB8WvDAHF+oZlq0GTVFOlTlO1q3AlCTE/DF32c16ESvfgqR7343/g==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ]
    },
    "node_modules/@rollup/rollup-freebsd-arm64": {
      "version": "4.60.2",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-freebsd-arm64/-/rollup-freebsd-arm64-4.60.2.tgz",
      "integrity": "sha512-Bcl6CYDeAgE70cqZaMojOi/eK63h5Me97ZqAQoh77VPjMysA/4ORQBRGo3rRy45x4MzVlU9uZxs8Uwy7ZaKnBw==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ]
    },
    "node_modules/@rollup/rollup-freebsd-x64": {
      "version": "4.60.2",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-freebsd-x64/-/rollup-freebsd-x64-4.60.2.tgz",
      "integrity": "sha512-LU+TPda3mAE2QB0/Hp5VyeKJivpC6+tlOXd1VMoXV/YFMvk/MNk5iXeBfB4MQGRWyOYVJ01625vjkr0Az98OJQ==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ]
    },
    "node_modules/@rollup/rollup-linux-arm-gnueabihf": {
      "version": "4.60.2",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-arm-gnueabihf/-/rollup-linux-arm-gnueabihf-4.60.2.tgz",
      "integrity": "sha512-2QxQrM+KQ7DAW4o22j+XZ6RKdxjLD7BOWTP0Bv0tmjdyhXSsr2Ul1oJDQqh9Zf5qOwTuTc7Ek83mOFaKnodPjg==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "libc": [
        "glibc"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-arm-musleabihf": {
      "version": "4.60.2",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-arm-musleabihf/-/rollup-linux-arm-musleabihf-4.60.2.tgz",
      "integrity": "sha512-TbziEu2DVsTEOPif2mKWkMeDMLoYjx95oESa9fkQQK7r/Orta0gnkcDpzwufEcAO2BLBsD7mZkXGFqEdMRRwfw==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "libc": [
        "musl"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-arm64-gnu": {
      "version": "4.60.2",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-arm64-gnu/-/rollup-linux-arm64-gnu-4.60.2.tgz",
      "integrity": "sha512-bO/rVDiDUuM2YfuCUwZ1t1cP+/yqjqz+Xf2VtkdppefuOFS2OSeAfgafaHNkFn0t02hEyXngZkxtGqXcXwO8Rg==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "libc": [
        "glibc"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-arm64-musl": {
      "version": "4.60.2",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-arm64-musl/-/rollup-linux-arm64-musl-4.60.2.tgz",
      "integrity": "sha512-hr26p7e93Rl0Za+JwW7EAnwAvKkehh12BU1Llm9Ykiibg4uIr2rbpxG9WCf56GuvidlTG9KiiQT/TXT1yAWxTA==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "libc": [
        "musl"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-loong64-gnu": {
      "version": "4.60.2",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-loong64-gnu/-/rollup-linux-loong64-gnu-4.60.2.tgz",
      "integrity": "sha512-pOjB/uSIyDt+ow3k/RcLvUAOGpysT2phDn7TTUB3n75SlIgZzM6NKAqlErPhoFU+npgY3/n+2HYIQVbF70P9/A==",
      "cpu": [
        "loong64"
      ],
      "dev": true,
      "libc": [
        "glibc"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-loong64-musl": {
      "version": "4.60.2",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-loong64-musl/-/rollup-linux-loong64-musl-4.60.2.tgz",
      "integrity": "sha512-2/w+q8jszv9Ww1c+6uJT3OwqhdmGP2/4T17cu8WuwyUuuaCDDJ2ojdyYwZzCxx0GcsZBhzi3HmH+J5pZNXnd+Q==",
      "cpu": [
        "loong64"
      ],
      "dev": true,
      "libc": [
        "musl"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-ppc64-gnu": {
      "version": "4.60.2",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-ppc64-gnu/-/rollup-linux-ppc64-gnu-4.60.2.tgz",
      "integrity": "sha512-11+aL5vKheYgczxtPVVRhdptAM2H7fcDR5Gw4/bTcteuZBlH4oP9f5s9zYO9aGZvoGeBpqXI/9TZZihZ609wKw==",
      "cpu": [
        "ppc64"
      ],
      "dev": true,
      "libc": [
        "glibc"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-ppc64-musl": {
      "version": "4.60.2",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-ppc64-musl/-/rollup-linux-ppc64-musl-4.60.2.tgz",
      "integrity": "sha512-i16fokAGK46IVZuV8LIIwMdtqhin9hfYkCh8pf8iC3QU3LpwL+1FSFGej+O7l3E/AoknL6Dclh2oTdnRMpTzFQ==",
      "cpu": [
        "ppc64"
      ],
      "dev": true,
      "libc": [
        "musl"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-riscv64-gnu": {
      "version": "4.60.2",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-riscv64-gnu/-/rollup-linux-riscv64-gnu-4.60.2.tgz",
      "integrity": "sha512-49FkKS6RGQoriDSK/6E2GkAsAuU5kETFCh7pG4yD/ylj9rKhTmO3elsnmBvRD4PgJPds5W2PkhC82aVwmUcJ7A==",
      "cpu": [
        "riscv64"
      ],
      "dev": true,
      "libc": [
        "glibc"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-riscv64-musl": {
      "version": "4.60.2",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-riscv64-musl/-/rollup-linux-riscv64-musl-4.60.2.tgz",
      "integrity": "sha512-mjYNkHPfGpUR00DuM1ZZIgs64Hpf4bWcz9Z41+4Q+pgDx73UwWdAYyf6EG/lRFldmdHHzgrYyge5akFUW0D3mQ==",
      "cpu": [
        "riscv64"
      ],
      "dev": true,
      "libc": [
        "musl"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-s390x-gnu": {
      "version": "4.60.2",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-s390x-gnu/-/rollup-linux-s390x-gnu-4.60.2.tgz",
      "integrity": "sha512-ALyvJz965BQk8E9Al/JDKKDLH2kfKFLTGMlgkAbbYtZuJt9LU8DW3ZoDMCtQpXAltZxwBHevXz5u+gf0yA0YoA==",
      "cpu": [
        "s390x"
      ],
      "dev": true,
      "libc": [
        "glibc"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-x64-gnu": {
      "version": "4.60.2",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-x64-gnu/-/rollup-linux-x64-gnu-4.60.2.tgz",
      "integrity": "sha512-UQjrkIdWrKI626Du8lCQ6MJp/6V1LAo2bOK9OTu4mSn8GGXIkPXk/Vsp4bLHCd9Z9Iz2OTEaokUE90VweJgIYQ==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "libc": [
        "glibc"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-x64-musl": {
      "version": "4.60.2",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-x64-musl/-/rollup-linux-x64-musl-4.60.2.tgz",
      "integrity": "sha512-bTsRGj6VlSdn/XD4CGyzMnzaBs9bsRxy79eTqTCBsA8TMIEky7qg48aPkvJvFe1HyzQ5oMZdg7AnVlWQSKLTnw==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "libc": [
        "musl"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-openbsd-x64": {
      "version": "4.60.2",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-openbsd-x64/-/rollup-openbsd-x64-4.60.2.tgz",
      "integrity": "sha512-6d4Z3534xitaA1FcMWP7mQPq5zGwBmGbhphh2DwaA1aNIXUu3KTOfwrWpbwI4/Gr0uANo7NTtaykFyO2hPuFLg==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "openbsd"
      ]
    },
    "node_modules/@rollup/rollup-openharmony-arm64": {
      "version": "4.60.2",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-openharmony-arm64/-/rollup-openharmony-arm64-4.60.2.tgz",
      "integrity": "sha512-NetAg5iO2uN7eB8zE5qrZ3CSil+7IJt4WDFLcC75Ymywq1VZVD6qJ6EvNLjZ3rEm6gB7XW5JdT60c6MN35Z85Q==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "openharmony"
      ]
    },
    "node_modules/@rollup/rollup-win32-arm64-msvc": {
      "version": "4.60.2",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-win32-arm64-msvc/-/rollup-win32-arm64-msvc-4.60.2.tgz",
      "integrity": "sha512-NCYhOotpgWZ5kdxCZsv6Iudx0wX8980Q/oW4pNFNihpBKsDbEA1zpkfxJGC0yugsUuyDZ7gL37dbzwhR0VI7pQ==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ]
    },
    "node_modules/@rollup/rollup-win32-ia32-msvc": {
      "version": "4.60.2",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-win32-ia32-msvc/-/rollup-win32-ia32-msvc-4.60.2.tgz",
      "integrity": "sha512-RXsaOqXxfoUBQoOgvmmijVxJnW2IGB0eoMO7F8FAjaj0UTywUO/luSqimWBJn04WNgUkeNhh7fs7pESXajWmkg==",
      "cpu": [
        "ia32"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ]
    },
    "node_modules/@rollup/rollup-win32-x64-gnu": {
      "version": "4.60.2",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-win32-x64-gnu/-/rollup-win32-x64-gnu-4.60.2.tgz",
      "integrity": "sha512-qdAzEULD+/hzObedtmV6iBpdL5TIbKVztGiK7O3/KYSf+HIzU257+MX1EXJcyIiDbMAqmbwaufcYPvyRryeZtA==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ]
    },
    "node_modules/@rollup/rollup-win32-x64-msvc": {
      "version": "4.60.2",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-win32-x64-msvc/-/rollup-win32-x64-msvc-4.60.2.tgz",
      "integrity": "sha512-Nd/SgG27WoA9e+/TdK74KnHz852TLa94ovOYySo/yMPuTmpckK/jIF2jSwS3g7ELSKXK13/cVdmg1Z/DaCWKxA==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ]
    },
    "node_modules/@supabase/auth-js": {
      "version": "2.104.1",
      "resolved": "https://registry.npmjs.org/@supabase/auth-js/-/auth-js-2.104.1.tgz",
      "integrity": "sha512-pqFnDKekq1isqlqnzqzyJ3mzmho+o+FjfVTqhKY3PFlwj2anx3OPznO1kbo1ZEwD8zg1r4EAFf/7pplLyX0ocQ==",
      "license": "MIT",
      "dependencies": {
        "tslib": "2.8.1"
      },
      "engines": {
        "node": ">=20.0.0"
      }
    },
    "node_modules/@supabase/functions-js": {
      "version": "2.104.1",
      "resolved": "https://registry.npmjs.org/@supabase/functions-js/-/functions-js-2.104.1.tgz",
      "integrity": "sha512-JjAH4JN9rZzxh4plQnILPrQZXAG6ccoRS6z9hQAGmXpRSwJA+7CWbsDV2R82I8MROlGDsjqj1Ot/cWpTfdf6xg==",
      "license": "MIT",
      "dependencies": {
        "tslib": "2.8.1"
      },
      "engines": {
        "node": ">=20.0.0"
      }
    },
    "node_modules/@supabase/phoenix": {
      "version": "0.4.0",
      "resolved": "https://registry.npmjs.org/@supabase/phoenix/-/phoenix-0.4.0.tgz",
      "integrity": "sha512-RHSx8bHS02xwfHdAbX5Lpbo6PXbgyf7lTaXTlwtFDPwOIw64NnVRwFAXGojHhjtVYI+PEPNSWwkL90f4agN3bw==",
      "license": "MIT"
    },
    "node_modules/@supabase/postgrest-js": {
      "version": "2.104.1",
      "resolved": "https://registry.npmjs.org/@supabase/postgrest-js/-/postgrest-js-2.104.1.tgz",
      "integrity": "sha512-RqlLpvgXsjcc27fLyHNGm3zN0KDWXbkdTdaFtaEdX83RsTEqH7BAmshH7zoUMml5lL04naUeRjS3B81O6jZcJw==",
      "license": "MIT",
      "dependencies": {
        "tslib": "2.8.1"
      },
      "engines": {
        "node": ">=20.0.0"
      }
    },
    "node_modules/@supabase/realtime-js": {
      "version": "2.104.1",
      "resolved": "https://registry.npmjs.org/@supabase/realtime-js/-/realtime-js-2.104.1.tgz",
      "integrity": "sha512-dVJHhFB2ErBd0/2qE9G8CedCrGoAtBfL9Q4zbSMXO7b1Cpld916ljSiX21mURUqijPf1WoPQG4Bp/averUzk/g==",
      "license": "MIT",
      "dependencies": {
        "@supabase/phoenix": "^0.4.0",
        "@types/ws": "^8.18.1",
        "tslib": "2.8.1",
        "ws": "^8.18.2"
      },
      "engines": {
        "node": ">=20.0.0"
      }
    },
    "node_modules/@supabase/storage-js": {
      "version": "2.104.1",
      "resolved": "https://registry.npmjs.org/@supabase/storage-js/-/storage-js-2.104.1.tgz",
      "integrity": "sha512-2bQaLbkRshctkUVuqamwYZDEd+0cGSc9DY9sjh92DcA5hu1F/1AP8p6gxGr76sgdK9Ngi0rh+2Kdh+uC4hcnGA==",
      "license": "MIT",
      "dependencies": {
        "iceberg-js": "^0.8.1",
        "tslib": "2.8.1"
      },
      "engines": {
        "node": ">=20.0.0"
      }
    },
    "node_modules/@supabase/supabase-js": {
      "version": "2.104.1",
      "resolved": "https://registry.npmjs.org/@supabase/supabase-js/-/supabase-js-2.104.1.tgz",
      "integrity": "sha512-E0H/CtVmaGjiAy+ieZ5ZB/1EqxXcGdaFaAc23AE5zaYfz6NtCNDcmaEdoGPYMPFH5pE6drGG6e3ljPmkFoGVxQ==",
      "license": "MIT",
      "dependencies": {
        "@supabase/auth-js": "2.104.1",
        "@supabase/functions-js": "2.104.1",
        "@supabase/postgrest-js": "2.104.1",
        "@supabase/realtime-js": "2.104.1",
        "@supabase/storage-js": "2.104.1"
      },
      "engines": {
        "node": ">=20.0.0"
      }
    },
    "node_modules/@types/babel__core": {
      "version": "7.20.5",
      "resolved": "https://registry.npmjs.org/@types/babel__core/-/babel__core-7.20.5.tgz",
      "integrity": "sha512-qoQprZvz5wQFJwMDqeseRXWv3rqMvhgpbXFfVyWhbx9X47POIA6i/+dXefEmZKoAgOaTdaIgNSMqMIU61yRyzA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/parser": "^7.20.7",
        "@babel/types": "^7.20.7",
        "@types/babel__generator": "*",
        "@types/babel__template": "*",
        "@types/babel__traverse": "*"
      }
    },
    "node_modules/@types/babel__generator": {
      "version": "7.27.0",
      "resolved": "https://registry.npmjs.org/@types/babel__generator/-/babel__generator-7.27.0.tgz",
      "integrity": "sha512-ufFd2Xi92OAVPYsy+P4n7/U7e68fex0+Ee8gSG9KX7eo084CWiQ4sdxktvdl0bOPupXtVJPY19zk6EwWqUQ8lg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/types": "^7.0.0"
      }
    },
    "node_modules/@types/babel__template": {
      "version": "7.4.4",
      "resolved": "https://registry.npmjs.org/@types/babel__template/-/babel__template-7.4.4.tgz",
      "integrity": "sha512-h/NUaSyG5EyxBIp8YRxo4RMe2/qQgvyowRwVMzhYhBCONbW8PUsg4lkFMrhgZhUe5z3L3MiLDuvyJ/CaPa2A8A==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/parser": "^7.1.0",
        "@babel/types": "^7.0.0"
      }
    },
    "node_modules/@types/babel__traverse": {
      "version": "7.28.0",
      "resolved": "https://registry.npmjs.org/@types/babel__traverse/-/babel__traverse-7.28.0.tgz",
      "integrity": "sha512-8PvcXf70gTDZBgt9ptxJ8elBeBjcLOAcOtoO/mPJjtji1+CdGbHgm77om1GrsPxsiE+uXIpNSK64UYaIwQXd4Q==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/types": "^7.28.2"
      }
    },
    "node_modules/@types/estree": {
      "version": "1.0.8",
      "resolved": "https://registry.npmjs.org/@types/estree/-/estree-1.0.8.tgz",
      "integrity": "sha512-dWHzHa2WqEXI/O1E9OjrocMTKJl2mSrEolh1Iomrv6U+JuNwaHXsXx9bLu5gG7BUWFIN0skIQJQ/L1rIex4X6w==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/node": {
      "version": "25.6.0",
      "resolved": "https://registry.npmjs.org/@types/node/-/node-25.6.0.tgz",
      "integrity": "sha512-+qIYRKdNYJwY3vRCZMdJbPLJAtGjQBudzZzdzwQYkEPQd+PJGixUL5QfvCLDaULoLv+RhT3LDkwEfKaAkgSmNQ==",
      "license": "MIT",
      "dependencies": {
        "undici-types": "~7.19.0"
      }
    },
    "node_modules/@types/ws": {
      "version": "8.18.1",
      "resolved": "https://registry.npmjs.org/@types/ws/-/ws-8.18.1.tgz",
      "integrity": "sha512-ThVF6DCVhA8kUGy+aazFQ4kXQ7E1Ty7A3ypFOe0IcJV8O/M511G99AW24irKrW56Wt44yG9+ij8FaqoBGkuBXg==",
      "license": "MIT",
      "dependencies": {
        "@types/node": "*"
      }
    },
    "node_modules/@vitejs/plugin-react": {
      "version": "4.7.0",
      "resolved": "https://registry.npmjs.org/@vitejs/plugin-react/-/plugin-react-4.7.0.tgz",
      "integrity": "sha512-gUu9hwfWvvEDBBmgtAowQCojwZmJ5mcLn3aufeCsitijs3+f2NsrPtlAWIR6OPiqljl96GVCUbLe0HyqIpVaoA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/core": "^7.28.0",
        "@babel/plugin-transform-react-jsx-self": "^7.27.1",
        "@babel/plugin-transform-react-jsx-source": "^7.27.1",
        "@rolldown/pluginutils": "1.0.0-beta.27",
        "@types/babel__core": "^7.20.5",
        "react-refresh": "^0.17.0"
      },
      "engines": {
        "node": "^14.18.0 || >=16.0.0"
      },
      "peerDependencies": {
        "vite": "^4.2.0 || ^5.0.0 || ^6.0.0 || ^7.0.0"
      }
    },
    "node_modules/any-promise": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/any-promise/-/any-promise-1.3.0.tgz",
      "integrity": "sha512-7UvmKalWRt1wgjL1RrGxoSJW/0QZFIegpeGvZG9kjp8vrRu55XTHbwnqq2GpXm9uLbcuhxm3IqX9OB4MZR1b2A==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/anymatch": {
      "version": "3.1.3",
      "resolved": "https://registry.npmjs.org/anymatch/-/anymatch-3.1.3.tgz",
      "integrity": "sha512-KMReFUr0B4t+D+OBkjR3KYqvocp2XaSzO55UcB6mgQMd3KbcE+mWTyvVV7D/zsdEbNnV6acZUutkiHQXvTr1Rw==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "normalize-path": "^3.0.0",
        "picomatch": "^2.0.4"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/arg": {
      "version": "5.0.2",
      "resolved": "https://registry.npmjs.org/arg/-/arg-5.0.2.tgz",
      "integrity": "sha512-PYjyFOLKQ9y57JvQ6QLo8dAgNqswh8M1RMJYdQduT6xbWSgK36P/Z/v+p888pM69jMMfS8Xd8F6I1kQ/I9HUGg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/autoprefixer": {
      "version": "10.5.0",
      "resolved": "https://registry.npmjs.org/autoprefixer/-/autoprefixer-10.5.0.tgz",
      "integrity": "sha512-FMhOoZV4+qR6aTUALKX2rEqGG+oyATvwBt9IIzVR5rMa2HRWPkxf+P+PAJLD1I/H5/II+HuZcBJYEFBpq39ong==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/autoprefixer"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "browserslist": "^4.28.2",
        "caniuse-lite": "^1.0.30001787",
        "fraction.js": "^5.3.4",
        "picocolors": "^1.1.1",
        "postcss-value-parser": "^4.2.0"
      },
      "bin": {
        "autoprefixer": "bin/autoprefixer"
      },
      "engines": {
        "node": "^10 || ^12 || >=14"
      },
      "peerDependencies": {
        "postcss": "^8.1.0"
      }
    },
    "node_modules/baseline-browser-mapping": {
      "version": "2.10.21",
      "resolved": "https://registry.npmjs.org/baseline-browser-mapping/-/baseline-browser-mapping-2.10.21.tgz",
      "integrity": "sha512-Q+rUQ7Uz8AHM7DEaNdwvfFCTq7a43lNTzuS94eiWqwyxfV/wJv+oUivef51T91mmRY4d4A1u9rcSvkeufCVXlA==",
      "dev": true,
      "license": "Apache-2.0",
      "bin": {
        "baseline-browser-mapping": "dist/cli.cjs"
      },
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/binary-extensions": {
      "version": "2.3.0",
      "resolved": "https://registry.npmjs.org/binary-extensions/-/binary-extensions-2.3.0.tgz",
      "integrity": "sha512-Ceh+7ox5qe7LJuLHoY0feh3pHuUDHAcRUeyL2VYghZwfpkNIy/+8Ocg0a3UuSoYzavmylwuLWQOf3hl0jjMMIw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/braces": {
      "version": "3.0.3",
      "resolved": "https://registry.npmjs.org/braces/-/braces-3.0.3.tgz",
      "integrity": "sha512-yQbXgO/OSZVD2IsiLlro+7Hf6Q18EJrKSEsdoMzKePKXct3gvD8oLcOQdIzGupr5Fj+EDe8gO/lxc1BzfMpxvA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "fill-range": "^7.1.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/browserslist": {
      "version": "4.28.2",
      "resolved": "https://registry.npmjs.org/browserslist/-/browserslist-4.28.2.tgz",
      "integrity": "sha512-48xSriZYYg+8qXna9kwqjIVzuQxi+KYWp2+5nCYnYKPTr0LvD89Jqk2Or5ogxz0NUMfIjhh2lIUX/LyX9B4oIg==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/browserslist"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/browserslist"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "baseline-browser-mapping": "^2.10.12",
        "caniuse-lite": "^1.0.30001782",
        "electron-to-chromium": "^1.5.328",
        "node-releases": "^2.0.36",
        "update-browserslist-db": "^1.2.3"
      },
      "bin": {
        "browserslist": "cli.js"
      },
      "engines": {
        "node": "^6 || ^7 || ^8 || ^9 || ^10 || ^11 || ^12 || >=13.7"
      }
    },
    "node_modules/camelcase-css": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/camelcase-css/-/camelcase-css-2.0.1.tgz",
      "integrity": "sha512-QOSvevhslijgYwRx6Rv7zKdMF8lbRmx+uQGx2+vDc+KI/eBnsy9kit5aj23AgGu3pa4t9AgwbnXWqS+iOY+2aA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/caniuse-lite": {
      "version": "1.0.30001790",
      "resolved": "https://registry.npmjs.org/caniuse-lite/-/caniuse-lite-1.0.30001790.tgz",
      "integrity": "sha512-bOoxfJPyYo+ds6W0YfptaCWbFnJYjh2Y1Eow5lRv+vI2u8ganPZqNm1JwNh0t2ELQCqIWg4B3dWEusgAmsoyOw==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/browserslist"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/caniuse-lite"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "CC-BY-4.0"
    },
    "node_modules/chokidar": {
      "version": "3.6.0",
      "resolved": "https://registry.npmjs.org/chokidar/-/chokidar-3.6.0.tgz",
      "integrity": "sha512-7VT13fmjotKpGipCW9JEQAusEPE+Ei8nl6/g4FBAmIm0GOOLMua9NDDo/DWp0ZAxCr3cPq5ZpBqmPAQgDda2Pw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "anymatch": "~3.1.2",
        "braces": "~3.0.2",
        "glob-parent": "~5.1.2",
        "is-binary-path": "~2.1.0",
        "is-glob": "~4.0.1",
        "normalize-path": "~3.0.0",
        "readdirp": "~3.6.0"
      },
      "engines": {
        "node": ">= 8.10.0"
      },
      "funding": {
        "url": "https://paulmillr.com/funding/"
      },
      "optionalDependencies": {
        "fsevents": "~2.3.2"
      }
    },
    "node_modules/chokidar/node_modules/glob-parent": {
      "version": "5.1.2",
      "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-5.1.2.tgz",
      "integrity": "sha512-AOIgSQCepiJYwP3ARnGx+5VnTu2HBYdzbGP45eLw1vr3zB3vZLeyed1sC9hnbcOc9/SrMyM5RPQrkGz4aS9Zow==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "is-glob": "^4.0.1"
      },
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/commander": {
      "version": "4.1.1",
      "resolved": "https://registry.npmjs.org/commander/-/commander-4.1.1.tgz",
      "integrity": "sha512-NOKm8xhkzAjzFx8B2v5OAHT+u5pRQc2UCa2Vq9jYL/31o2wi9mxBA7LIFs3sV5VSC49z6pEhfbMULvShKj26WA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/convert-source-map": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/convert-source-map/-/convert-source-map-2.0.0.tgz",
      "integrity": "sha512-Kvp459HrV2FEJ1CAsi1Ku+MY3kasH19TFykTz2xWmMeq6bk2NU3XXvfJ+Q61m0xktWwt+1HSYf3JZsTms3aRJg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/cssesc": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/cssesc/-/cssesc-3.0.0.tgz",
      "integrity": "sha512-/Tb/JcjK111nNScGob5MNtsntNM1aCNUDipB/TkwZFhyDrrE47SOx/18wF2bbjgc3ZzCSKW1T5nt5EbFoAz/Vg==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "cssesc": "bin/cssesc"
      },
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/debug": {
      "version": "4.4.3",
      "resolved": "https://registry.npmjs.org/debug/-/debug-4.4.3.tgz",
      "integrity": "sha512-RGwwWnwQvkVfavKVt22FGLw+xYSdzARwm0ru6DhTVA3umU5hZc28V3kO4stgYryrTlLpuvgI9GiijltAjNbcqA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ms": "^2.1.3"
      },
      "engines": {
        "node": ">=6.0"
      },
      "peerDependenciesMeta": {
        "supports-color": {
          "optional": true
        }
      }
    },
    "node_modules/didyoumean": {
      "version": "1.2.2",
      "resolved": "https://registry.npmjs.org/didyoumean/-/didyoumean-1.2.2.tgz",
      "integrity": "sha512-gxtyfqMg7GKyhQmb056K7M3xszy/myH8w+B4RT+QXBQsvAOdc3XymqDDPHx1BgPgsdAA5SIifona89YtRATDzw==",
      "dev": true,
      "license": "Apache-2.0"
    },
    "node_modules/dlv": {
      "version": "1.1.3",
      "resolved": "https://registry.npmjs.org/dlv/-/dlv-1.1.3.tgz",
      "integrity": "sha512-+HlytyjlPKnIG8XuRG8WvmBP8xs8P71y+SKKS6ZXWoEgLuePxtDoUEiH7WkdePWrQ5JBpE6aoVqfZfJUQkjXwA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/electron-to-chromium": {
      "version": "1.5.344",
      "resolved": "https://registry.npmjs.org/electron-to-chromium/-/electron-to-chromium-1.5.344.tgz",
      "integrity": "sha512-4MxfbmNDm+KPh066EZy+eUnkcDPcZ35wNmOWzFuh/ijvHsve6kbLTLURy88uCNK5FbpN+yk2nQY6BYh1GEt+wg==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/es-errors": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/es-errors/-/es-errors-1.3.0.tgz",
      "integrity": "sha512-Zf5H2Kxt2xjTvbJvP2ZWLEICxA6j+hAmMzIlypy4xcBg1vKVnx89Wy0GbS+kf5cwCVFFzdCFh2XSCFNULS6csw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/esbuild": {
      "version": "0.21.5",
      "resolved": "https://registry.npmjs.org/esbuild/-/esbuild-0.21.5.tgz",
      "integrity": "sha512-mg3OPMV4hXywwpoDxu3Qda5xCKQi+vCTZq8S9J/EpkhB2HzKXq4SNFZE3+NK93JYxc8VMSep+lOUSC/RVKaBqw==",
      "dev": true,
      "hasInstallScript": true,
      "license": "MIT",
      "bin": {
        "esbuild": "bin/esbuild"
      },
      "engines": {
        "node": ">=12"
      },
      "optionalDependencies": {
        "@esbuild/aix-ppc64": "0.21.5",
        "@esbuild/android-arm": "0.21.5",
        "@esbuild/android-arm64": "0.21.5",
        "@esbuild/android-x64": "0.21.5",
        "@esbuild/darwin-arm64": "0.21.5",
        "@esbuild/darwin-x64": "0.21.5",
        "@esbuild/freebsd-arm64": "0.21.5",
        "@esbuild/freebsd-x64": "0.21.5",
        "@esbuild/linux-arm": "0.21.5",
        "@esbuild/linux-arm64": "0.21.5",
        "@esbuild/linux-ia32": "0.21.5",
        "@esbuild/linux-loong64": "0.21.5",
        "@esbuild/linux-mips64el": "0.21.5",
        "@esbuild/linux-ppc64": "0.21.5",
        "@esbuild/linux-riscv64": "0.21.5",
        "@esbuild/linux-s390x": "0.21.5",
        "@esbuild/linux-x64": "0.21.5",
        "@esbuild/netbsd-x64": "0.21.5",
        "@esbuild/openbsd-x64": "0.21.5",
        "@esbuild/sunos-x64": "0.21.5",
        "@esbuild/win32-arm64": "0.21.5",
        "@esbuild/win32-ia32": "0.21.5",
        "@esbuild/win32-x64": "0.21.5"
      }
    },
    "node_modules/escalade": {
      "version": "3.2.0",
      "resolved": "https://registry.npmjs.org/escalade/-/escalade-3.2.0.tgz",
      "integrity": "sha512-WUj2qlxaQtO4g6Pq5c29GTcWGDyd8itL8zTlipgECz3JesAiiOKotd8JU6otB3PACgG6xkJUyVhboMS+bje/jA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/fast-glob": {
      "version": "3.3.3",
      "resolved": "https://registry.npmjs.org/fast-glob/-/fast-glob-3.3.3.tgz",
      "integrity": "sha512-7MptL8U0cqcFdzIzwOTHoilX9x5BrNqye7Z/LuC7kCMRio1EMSyqRK3BEAUD7sXRq4iT4AzTVuZdhgQ2TCvYLg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@nodelib/fs.stat": "^2.0.2",
        "@nodelib/fs.walk": "^1.2.3",
        "glob-parent": "^5.1.2",
        "merge2": "^1.3.0",
        "micromatch": "^4.0.8"
      },
      "engines": {
        "node": ">=8.6.0"
      }
    },
    "node_modules/fast-glob/node_modules/glob-parent": {
      "version": "5.1.2",
      "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-5.1.2.tgz",
      "integrity": "sha512-AOIgSQCepiJYwP3ARnGx+5VnTu2HBYdzbGP45eLw1vr3zB3vZLeyed1sC9hnbcOc9/SrMyM5RPQrkGz4aS9Zow==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "is-glob": "^4.0.1"
      },
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/fastq": {
      "version": "1.20.1",
      "resolved": "https://registry.npmjs.org/fastq/-/fastq-1.20.1.tgz",
      "integrity": "sha512-GGToxJ/w1x32s/D2EKND7kTil4n8OVk/9mycTc4VDza13lOvpUZTGX3mFSCtV9ksdGBVzvsyAVLM6mHFThxXxw==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "reusify": "^1.0.4"
      }
    },
    "node_modules/fill-range": {
      "version": "7.1.1",
      "resolved": "https://registry.npmjs.org/fill-range/-/fill-range-7.1.1.tgz",
      "integrity": "sha512-YsGpe3WHLK8ZYi4tWDg2Jy3ebRz2rXowDxnld4bkQB00cc/1Zw9AWnC0i9ztDJitivtQvaI9KaLyKrc+hBW0yg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "to-regex-range": "^5.0.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/fraction.js": {
      "version": "5.3.4",
      "resolved": "https://registry.npmjs.org/fraction.js/-/fraction.js-5.3.4.tgz",
      "integrity": "sha512-1X1NTtiJphryn/uLQz3whtY6jK3fTqoE3ohKs0tT+Ujr1W59oopxmoEh7Lu5p6vBaPbgoM0bzveAW4Qi5RyWDQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": "*"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/rawify"
      }
    },
    "node_modules/fsevents": {
      "version": "2.3.3",
      "resolved": "https://registry.npmjs.org/fsevents/-/fsevents-2.3.3.tgz",
      "integrity": "sha512-5xoDfX+fL7faATnagmWPpbFtwh/R77WmMMqqHGS65C3vvB0YHrgF+B1YmZ3441tMj5n63k0212XNoJwzlhffQw==",
      "dev": true,
      "hasInstallScript": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": "^8.16.0 || ^10.6.0 || >=11.0.0"
      }
    },
    "node_modules/function-bind": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/function-bind/-/function-bind-1.1.2.tgz",
      "integrity": "sha512-7XHNxH7qX9xG5mIwxkhumTox/MIRNcOgDrxWsMt2pAr23WHp6MrRlN7FBSFpCpr+oVO0F744iUgR82nJMfG2SA==",
      "dev": true,
      "license": "MIT",
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/gensync": {
      "version": "1.0.0-beta.2",
      "resolved": "https://registry.npmjs.org/gensync/-/gensync-1.0.0-beta.2.tgz",
      "integrity": "sha512-3hN7NaskYvMDLQY55gnW3NQ+mesEAepTqlg+VEbj7zzqEMBVNhzcGYYeqFo/TlYz6eQiFcp1HcsCZO+nGgS8zg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/glob-parent": {
      "version": "6.0.2",
      "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-6.0.2.tgz",
      "integrity": "sha512-XxwI8EOhVQgWp6iDL+3b0r86f4d6AX6zSU55HfB4ydCEuXLXc5FcYeOu+nnGftS4TEju/11rt4KJPTMgbfmv4A==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "is-glob": "^4.0.3"
      },
      "engines": {
        "node": ">=10.13.0"
      }
    },
    "node_modules/hasown": {
      "version": "2.0.3",
      "resolved": "https://registry.npmjs.org/hasown/-/hasown-2.0.3.tgz",
      "integrity": "sha512-ej4AhfhfL2Q2zpMmLo7U1Uv9+PyhIZpgQLGT1F9miIGmiCJIoCgSmczFdrc97mWT4kVY72KA+WnnhJ5pghSvSg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "function-bind": "^1.1.2"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/iceberg-js": {
      "version": "0.8.1",
      "resolved": "https://registry.npmjs.org/iceberg-js/-/iceberg-js-0.8.1.tgz",
      "integrity": "sha512-1dhVQZXhcHje7798IVM+xoo/1ZdVfzOMIc8/rgVSijRK38EDqOJoGula9N/8ZI5RD8QTxNQtK/Gozpr+qUqRRA==",
      "license": "MIT",
      "engines": {
        "node": ">=20.0.0"
      }
    },
    "node_modules/is-binary-path": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/is-binary-path/-/is-binary-path-2.1.0.tgz",
      "integrity": "sha512-ZMERYes6pDydyuGidse7OsHxtbI7WVeUEozgR/g7rd0xUimYNlvZRE/K2MgZTjWy725IfelLeVcEM97mmtRGXw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "binary-extensions": "^2.0.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/is-core-module": {
      "version": "2.16.1",
      "resolved": "https://registry.npmjs.org/is-core-module/-/is-core-module-2.16.1.tgz",
      "integrity": "sha512-UfoeMA6fIJ8wTYFEUjelnaGI67v6+N7qXJEvQuIGa99l4xsCruSYOVSQ0uPANn4dAzm8lkYPaKLrrijLq7x23w==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "hasown": "^2.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-extglob": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/is-extglob/-/is-extglob-2.1.1.tgz",
      "integrity": "sha512-SbKbANkN603Vi4jEZv49LeVJMn4yGwsbzZworEoyEiutsN3nJYdbO36zfhGJ6QEDpOZIFkDtnq5JRxmvl3jsoQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/is-glob": {
      "version": "4.0.3",
      "resolved": "https://registry.npmjs.org/is-glob/-/is-glob-4.0.3.tgz",
      "integrity": "sha512-xelSayHH36ZgE7ZWhli7pW34hNbNl8Ojv5KVmkJD4hBdD3th8Tfk9vYasLM+mXWOZhFkgZfxhLSnrwRr4elSSg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "is-extglob": "^2.1.1"
      },
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/is-number": {
      "version": "7.0.0",
      "resolved": "https://registry.npmjs.org/is-number/-/is-number-7.0.0.tgz",
      "integrity": "sha512-41Cifkg6e8TylSpdtTpeLVMqvSBEVzTttHvERD741+pnZ8ANv0004MRL43QKPDlK9cGvNp6NZWZUBlbGXYxxng==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.12.0"
      }
    },
    "node_modules/jiti": {
      "version": "1.21.7",
      "resolved": "https://registry.npmjs.org/jiti/-/jiti-1.21.7.tgz",
      "integrity": "sha512-/imKNG4EbWNrVjoNC/1H5/9GFy+tqjGBHCaSsN+P2RnPqjsLmv6UD3Ej+Kj8nBWaRAwyk7kK5ZUc+OEatnTR3A==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "jiti": "bin/jiti.js"
      }
    },
    "node_modules/js-tokens": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/js-tokens/-/js-tokens-4.0.0.tgz",
      "integrity": "sha512-RdJUflcE3cUzKiMqQgsCu06FPu9UdIJO0beYbPhHN4k6apgJtifcoCtT9bcxOpYBtpD2kCM6Sbzg4CausW/PKQ==",
      "license": "MIT"
    },
    "node_modules/jsesc": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/jsesc/-/jsesc-3.1.0.tgz",
      "integrity": "sha512-/sM3dO2FOzXjKQhJuo0Q173wf2KOo8t4I8vHy6lF9poUp7bKT0/NHE8fPX23PwfhnykfqnC2xRxOnVw5XuGIaA==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "jsesc": "bin/jsesc"
      },
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/json5": {
      "version": "2.2.3",
      "resolved": "https://registry.npmjs.org/json5/-/json5-2.2.3.tgz",
      "integrity": "sha512-XmOWe7eyHYH14cLdVPoyg+GOH3rYX++KpzrylJwSW98t3Nk+U8XOl8FWKOgwtzdb8lXGf6zYwDUzeHMWfxasyg==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "json5": "lib/cli.js"
      },
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/lilconfig": {
      "version": "3.1.3",
      "resolved": "https://registry.npmjs.org/lilconfig/-/lilconfig-3.1.3.tgz",
      "integrity": "sha512-/vlFKAoH5Cgt3Ie+JLhRbwOsCQePABiU3tJ1egGvyQ+33R/vcwM2Zl2QR/LzjsBeItPt3oSVXapn+m4nQDvpzw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=14"
      },
      "funding": {
        "url": "https://github.com/sponsors/antonk52"
      }
    },
    "node_modules/lines-and-columns": {
      "version": "1.2.4",
      "resolved": "https://registry.npmjs.org/lines-and-columns/-/lines-and-columns-1.2.4.tgz",
      "integrity": "sha512-7ylylesZQ/PV29jhEDl3Ufjo6ZX7gCqJr5F7PKrqc93v7fzSymt1BpwEU8nAUXs8qzzvqhbjhK5QZg6Mt/HkBg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/loose-envify": {
      "version": "1.4.0",
      "resolved": "https://registry.npmjs.org/loose-envify/-/loose-envify-1.4.0.tgz",
      "integrity": "sha512-lyuxPGr/Wfhrlem2CL/UcnUc1zcqKAImBDzukY7Y5F/yQiNdko6+fRLevlw1HgMySw7f611UIY408EtxRSoK3Q==",
      "license": "MIT",
      "dependencies": {
        "js-tokens": "^3.0.0 || ^4.0.0"
      },
      "bin": {
        "loose-envify": "cli.js"
      }
    },
    "node_modules/lru-cache": {
      "version": "5.1.1",
      "resolved": "https://registry.npmjs.org/lru-cache/-/lru-cache-5.1.1.tgz",
      "integrity": "sha512-KpNARQA3Iwv+jTA0utUVVbrh+Jlrr1Fv0e56GGzAFOXN7dk/FviaDW8LHmK52DlcH4WP2n6gI8vN1aesBFgo9w==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "yallist": "^3.0.2"
      }
    },
    "node_modules/merge2": {
      "version": "1.4.1",
      "resolved": "https://registry.npmjs.org/merge2/-/merge2-1.4.1.tgz",
      "integrity": "sha512-8q7VEgMJW4J8tcfVPy8g09NcQwZdbwFEqhe/WZkoIzjn/3TGDwtOCYtXGxA3O8tPzpczCCDgv+P2P5y00ZJOOg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/micromatch": {
      "version": "4.0.8",
      "resolved": "https://registry.npmjs.org/micromatch/-/micromatch-4.0.8.tgz",
      "integrity": "sha512-PXwfBhYu0hBCPw8Dn0E+WDYb7af3dSLVWKi3HGv84IdF4TyFoC0ysxFd0Goxw7nSv4T/PzEJQxsYsEiFCKo2BA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "braces": "^3.0.3",
        "picomatch": "^2.3.1"
      },
      "engines": {
        "node": ">=8.6"
      }
    },
    "node_modules/ms": {
      "version": "2.1.3",
      "resolved": "https://registry.npmjs.org/ms/-/ms-2.1.3.tgz",
      "integrity": "sha512-6FlzubTLZG3J2a/NVCAleEhjzq5oxgHyaCU9yYXvcLsvoVaHJq/s5xXI6/XXP6tz7R9xAOtHnSO/tXtF3WRTlA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/mz": {
      "version": "2.7.0",
      "resolved": "https://registry.npmjs.org/mz/-/mz-2.7.0.tgz",
      "integrity": "sha512-z81GNO7nnYMEhrGh9LeymoE4+Yr0Wn5McHIZMK5cfQCl+NDX08sCZgUc9/6MHni9IWuFLm1Z3HTCXu2z9fN62Q==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "any-promise": "^1.0.0",
        "object-assign": "^4.0.1",
        "thenify-all": "^1.0.0"
      }
    },
    "node_modules/nanoid": {
      "version": "3.3.11",
      "resolved": "https://registry.npmjs.org/nanoid/-/nanoid-3.3.11.tgz",
      "integrity": "sha512-N8SpfPUnUp1bK+PMYW8qSWdl9U+wwNWI4QKxOYDy9JAro3WMX7p2OeVRF9v+347pnakNevPmiHhNmZ2HbFA76w==",
      "dev": true,
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "bin": {
        "nanoid": "bin/nanoid.cjs"
      },
      "engines": {
        "node": "^10 || ^12 || ^13.7 || ^14 || >=15.0.1"
      }
    },
    "node_modules/node-releases": {
      "version": "2.0.38",
      "resolved": "https://registry.npmjs.org/node-releases/-/node-releases-2.0.38.tgz",
      "integrity": "sha512-3qT/88Y3FbH/Kx4szpQQ4HzUbVrHPKTLVpVocKiLfoYvw9XSGOX2FmD2d6DrXbVYyAQTF2HeF6My8jmzx7/CRw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/normalize-path": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/normalize-path/-/normalize-path-3.0.0.tgz",
      "integrity": "sha512-6eZs5Ls3WtCisHWp9S2GUy8dqkpGi4BVSz3GaqiE6ezub0512ESztXUwUB6C6IKbQkY2Pnb/mD4WYojCRwcwLA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/object-assign": {
      "version": "4.1.1",
      "resolved": "https://registry.npmjs.org/object-assign/-/object-assign-4.1.1.tgz",
      "integrity": "sha512-rJgTQnkUnH1sFw8yT6VSU3zD3sWmu6sZhIseY8VX+GRu3P6F7Fu+JNDoXfklElbLJSnc3FUQHVe4cU5hj+BcUg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/object-hash": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/object-hash/-/object-hash-3.0.0.tgz",
      "integrity": "sha512-RSn9F68PjH9HqtltsSnqYC1XXoWe9Bju5+213R98cNGttag9q9yAOTzdbsqvIa7aNm5WffBZFpWYr2aWrklWAw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/path-parse": {
      "version": "1.0.7",
      "resolved": "https://registry.npmjs.org/path-parse/-/path-parse-1.0.7.tgz",
      "integrity": "sha512-LDJzPVEEEPR+y48z93A0Ed0yXb8pAByGWo/k5YYdYgpY2/2EsOsksJrq7lOHxryrVOn1ejG6oAp8ahvOIQD8sw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/picocolors": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/picocolors/-/picocolors-1.1.1.tgz",
      "integrity": "sha512-xceH2snhtb5M9liqDsmEw56le376mTZkEX/jEb/RxNFyegNul7eNslCXP9FDj/Lcu0X8KEyMceP2ntpaHrDEVA==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/picomatch": {
      "version": "2.3.2",
      "resolved": "https://registry.npmjs.org/picomatch/-/picomatch-2.3.2.tgz",
      "integrity": "sha512-V7+vQEJ06Z+c5tSye8S+nHUfI51xoXIXjHQ99cQtKUkQqqO1kO/KCJUfZXuB47h/YBlDhah2H3hdUGXn8ie0oA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8.6"
      },
      "funding": {
        "url": "https://github.com/sponsors/jonschlinkert"
      }
    },
    "node_modules/pify": {
      "version": "2.3.0",
      "resolved": "https://registry.npmjs.org/pify/-/pify-2.3.0.tgz",
      "integrity": "sha512-udgsAY+fTnvv7kI7aaxbqwWNb0AHiB0qBO89PZKPkoTmGOgdbrHDKD+0B2X4uTfJ/FT1R09r9gTsjUjNJotuog==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/pirates": {
      "version": "4.0.7",
      "resolved": "https://registry.npmjs.org/pirates/-/pirates-4.0.7.tgz",
      "integrity": "sha512-TfySrs/5nm8fQJDcBDuUng3VOUKsd7S+zqvbOTiGXHfxX4wK31ard+hoNuvkicM/2YFzlpDgABOevKSsB4G/FA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/postcss": {
      "version": "8.5.10",
      "resolved": "https://registry.npmjs.org/postcss/-/postcss-8.5.10.tgz",
      "integrity": "sha512-pMMHxBOZKFU6HgAZ4eyGnwXF/EvPGGqUr0MnZ5+99485wwW41kW91A4LOGxSHhgugZmSChL5AlElNdwlNgcnLQ==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/postcss"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "nanoid": "^3.3.11",
        "picocolors": "^1.1.1",
        "source-map-js": "^1.2.1"
      },
      "engines": {
        "node": "^10 || ^12 || >=14"
      }
    },
    "node_modules/postcss-import": {
      "version": "15.1.0",
      "resolved": "https://registry.npmjs.org/postcss-import/-/postcss-import-15.1.0.tgz",
      "integrity": "sha512-hpr+J05B2FVYUAXHeK1YyI267J/dDDhMU6B6civm8hSY1jYJnBXxzKDKDswzJmtLHryrjhnDjqqp/49t8FALew==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "postcss-value-parser": "^4.0.0",
        "read-cache": "^1.0.0",
        "resolve": "^1.1.7"
      },
      "engines": {
        "node": ">=14.0.0"
      },
      "peerDependencies": {
        "postcss": "^8.0.0"
      }
    },
    "node_modules/postcss-js": {
      "version": "4.1.0",
      "resolved": "https://registry.npmjs.org/postcss-js/-/postcss-js-4.1.0.tgz",
      "integrity": "sha512-oIAOTqgIo7q2EOwbhb8UalYePMvYoIeRY2YKntdpFQXNosSu3vLrniGgmH9OKs/qAkfoj5oB3le/7mINW1LCfw==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "camelcase-css": "^2.0.1"
      },
      "engines": {
        "node": "^12 || ^14 || >= 16"
      },
      "peerDependencies": {
        "postcss": "^8.4.21"
      }
    },
    "node_modules/postcss-load-config": {
      "version": "6.0.1",
      "resolved": "https://registry.npmjs.org/postcss-load-config/-/postcss-load-config-6.0.1.tgz",
      "integrity": "sha512-oPtTM4oerL+UXmx+93ytZVN82RrlY/wPUV8IeDxFrzIjXOLF1pN+EmKPLbubvKHT2HC20xXsCAH2Z+CKV6Oz/g==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "lilconfig": "^3.1.1"
      },
      "engines": {
        "node": ">= 18"
      },
      "peerDependencies": {
        "jiti": ">=1.21.0",
        "postcss": ">=8.0.9",
        "tsx": "^4.8.1",
        "yaml": "^2.4.2"
      },
      "peerDependenciesMeta": {
        "jiti": {
          "optional": true
        },
        "postcss": {
          "optional": true
        },
        "tsx": {
          "optional": true
        },
        "yaml": {
          "optional": true
        }
      }
    },
    "node_modules/postcss-nested": {
      "version": "6.2.0",
      "resolved": "https://registry.npmjs.org/postcss-nested/-/postcss-nested-6.2.0.tgz",
      "integrity": "sha512-HQbt28KulC5AJzG+cZtj9kvKB93CFCdLvog1WFLf1D+xmMvPGlBstkpTEZfK5+AN9hfJocyBFCNiqyS48bpgzQ==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "postcss-selector-parser": "^6.1.1"
      },
      "engines": {
        "node": ">=12.0"
      },
      "peerDependencies": {
        "postcss": "^8.2.14"
      }
    },
    "node_modules/postcss-selector-parser": {
      "version": "6.1.2",
      "resolved": "https://registry.npmjs.org/postcss-selector-parser/-/postcss-selector-parser-6.1.2.tgz",
      "integrity": "sha512-Q8qQfPiZ+THO/3ZrOrO0cJJKfpYCagtMUkXbnEfmgUjwXg6z/WBeOyS9APBBPCTSiDV+s4SwQGu8yFsiMRIudg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "cssesc": "^3.0.0",
        "util-deprecate": "^1.0.2"
      },
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/postcss-value-parser": {
      "version": "4.2.0",
      "resolved": "https://registry.npmjs.org/postcss-value-parser/-/postcss-value-parser-4.2.0.tgz",
      "integrity": "sha512-1NNCs6uurfkVbeXG4S8JFT9t19m45ICnif8zWLd5oPSZ50QnwMfK+H3jv408d4jw/7Bttv5axS5IiHoLaVNHeQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/queue-microtask": {
      "version": "1.2.3",
      "resolved": "https://registry.npmjs.org/queue-microtask/-/queue-microtask-1.2.3.tgz",
      "integrity": "sha512-NuaNSa6flKT5JaSYQzJok04JzTL1CA6aGhv5rfLW3PgqA+M2ChpZQnAC8h8i4ZFkBS8X5RqkDBHA7r4hej3K9A==",
      "dev": true,
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/feross"
        },
        {
          "type": "patreon",
          "url": "https://www.patreon.com/feross"
        },
        {
          "type": "consulting",
          "url": "https://feross.org/support"
        }
      ],
      "license": "MIT"
    },
    "node_modules/react": {
      "version": "18.3.1",
      "resolved": "https://registry.npmjs.org/react/-/react-18.3.1.tgz",
      "integrity": "sha512-wS+hAgJShR0KhEvPJArfuPVN1+Hz1t0Y6n5jLrGQbkb4urgPE/0Rve+1kMB1v/oWgHgm4WIcV+i7F2pTVj+2iQ==",
      "license": "MIT",
      "dependencies": {
        "loose-envify": "^1.1.0"
      },
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/react-dom": {
      "version": "18.3.1",
      "resolved": "https://registry.npmjs.org/react-dom/-/react-dom-18.3.1.tgz",
      "integrity": "sha512-5m4nQKp+rZRb09LNH59GM4BxTh9251/ylbKIbpe7TpGxfJ+9kv6BLkLBXIjjspbgbnIBNqlI23tRnTWT0snUIw==",
      "license": "MIT",
      "dependencies": {
        "loose-envify": "^1.1.0",
        "scheduler": "^0.23.2"
      },
      "peerDependencies": {
        "react": "^18.3.1"
      }
    },
    "node_modules/react-refresh": {
      "version": "0.17.0",
      "resolved": "https://registry.npmjs.org/react-refresh/-/react-refresh-0.17.0.tgz",
      "integrity": "sha512-z6F7K9bV85EfseRCp2bzrpyQ0Gkw1uLoCel9XBVWPg/TjRj94SkJzUTGfOa4bs7iJvBWtQG0Wq7wnI0syw3EBQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/react-router": {
      "version": "6.30.3",
      "resolved": "https://registry.npmjs.org/react-router/-/react-router-6.30.3.tgz",
      "integrity": "sha512-XRnlbKMTmktBkjCLE8/XcZFlnHvr2Ltdr1eJX4idL55/9BbORzyZEaIkBFDhFGCEWBBItsVrDxwx3gnisMitdw==",
      "license": "MIT",
      "dependencies": {
        "@remix-run/router": "1.23.2"
      },
      "engines": {
        "node": ">=14.0.0"
      },
      "peerDependencies": {
        "react": ">=16.8"
      }
    },
    "node_modules/react-router-dom": {
      "version": "6.30.3",
      "resolved": "https://registry.npmjs.org/react-router-dom/-/react-router-dom-6.30.3.tgz",
      "integrity": "sha512-pxPcv1AczD4vso7G4Z3TKcvlxK7g7TNt3/FNGMhfqyntocvYKj+GCatfigGDjbLozC4baguJ0ReCigoDJXb0ag==",
      "license": "MIT",
      "dependencies": {
        "@remix-run/router": "1.23.2",
        "react-router": "6.30.3"
      },
      "engines": {
        "node": ">=14.0.0"
      },
      "peerDependencies": {
        "react": ">=16.8",
        "react-dom": ">=16.8"
      }
    },
    "node_modules/read-cache": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/read-cache/-/read-cache-1.0.0.tgz",
      "integrity": "sha512-Owdv/Ft7IjOgm/i0xvNDZ1LrRANRfew4b2prF3OWMQLxLfu3bS8FVhCsrSCMK4lR56Y9ya+AThoTpDCTxCmpRA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "pify": "^2.3.0"
      }
    },
    "node_modules/readdirp": {
      "version": "3.6.0",
      "resolved": "https://registry.npmjs.org/readdirp/-/readdirp-3.6.0.tgz",
      "integrity": "sha512-hOS089on8RduqdbhvQ5Z37A0ESjsqz6qnRcffsMU3495FuTdqSm+7bhJ29JvIOsBDEEnan5DPu9t3To9VRlMzA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "picomatch": "^2.2.1"
      },
      "engines": {
        "node": ">=8.10.0"
      }
    },
    "node_modules/resolve": {
      "version": "1.22.12",
      "resolved": "https://registry.npmjs.org/resolve/-/resolve-1.22.12.tgz",
      "integrity": "sha512-TyeJ1zif53BPfHootBGwPRYT1RUt6oGWsaQr8UyZW/eAm9bKoijtvruSDEmZHm92CwS9nj7/fWttqPCgzep8CA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0",
        "is-core-module": "^2.16.1",
        "path-parse": "^1.0.7",
        "supports-preserve-symlinks-flag": "^1.0.0"
      },
      "bin": {
        "resolve": "bin/resolve"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/reusify": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/reusify/-/reusify-1.1.0.tgz",
      "integrity": "sha512-g6QUff04oZpHs0eG5p83rFLhHeV00ug/Yf9nZM6fLeUrPguBTkTQOdpAWWspMh55TZfVQDPaN3NQJfbVRAxdIw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "iojs": ">=1.0.0",
        "node": ">=0.10.0"
      }
    },
    "node_modules/rollup": {
      "version": "4.60.2",
      "resolved": "https://registry.npmjs.org/rollup/-/rollup-4.60.2.tgz",
      "integrity": "sha512-J9qZyW++QK/09NyN/zeO0dG/1GdGfyp9lV8ajHnRVLfo/uFsbji5mHnDgn/qYdUHyCkM2N+8VyspgZclfAh0eQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/estree": "1.0.8"
      },
      "bin": {
        "rollup": "dist/bin/rollup"
      },
      "engines": {
        "node": ">=18.0.0",
        "npm": ">=8.0.0"
      },
      "optionalDependencies": {
        "@rollup/rollup-android-arm-eabi": "4.60.2",
        "@rollup/rollup-android-arm64": "4.60.2",
        "@rollup/rollup-darwin-arm64": "4.60.2",
        "@rollup/rollup-darwin-x64": "4.60.2",
        "@rollup/rollup-freebsd-arm64": "4.60.2",
        "@rollup/rollup-freebsd-x64": "4.60.2",
        "@rollup/rollup-linux-arm-gnueabihf": "4.60.2",
        "@rollup/rollup-linux-arm-musleabihf": "4.60.2",
        "@rollup/rollup-linux-arm64-gnu": "4.60.2",
        "@rollup/rollup-linux-arm64-musl": "4.60.2",
        "@rollup/rollup-linux-loong64-gnu": "4.60.2",
        "@rollup/rollup-linux-loong64-musl": "4.60.2",
        "@rollup/rollup-linux-ppc64-gnu": "4.60.2",
        "@rollup/rollup-linux-ppc64-musl": "4.60.2",
        "@rollup/rollup-linux-riscv64-gnu": "4.60.2",
        "@rollup/rollup-linux-riscv64-musl": "4.60.2",
        "@rollup/rollup-linux-s390x-gnu": "4.60.2",
        "@rollup/rollup-linux-x64-gnu": "4.60.2",
        "@rollup/rollup-linux-x64-musl": "4.60.2",
        "@rollup/rollup-openbsd-x64": "4.60.2",
        "@rollup/rollup-openharmony-arm64": "4.60.2",
        "@rollup/rollup-win32-arm64-msvc": "4.60.2",
        "@rollup/rollup-win32-ia32-msvc": "4.60.2",
        "@rollup/rollup-win32-x64-gnu": "4.60.2",
        "@rollup/rollup-win32-x64-msvc": "4.60.2",
        "fsevents": "~2.3.2"
      }
    },
    "node_modules/run-parallel": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/run-parallel/-/run-parallel-1.2.0.tgz",
      "integrity": "sha512-5l4VyZR86LZ/lDxZTR6jqL8AFE2S0IFLMP26AbjsLVADxHdhB/c0GUsH+y39UfCi3dzz8OlQuPmnaJOMoDHQBA==",
      "dev": true,
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/feross"
        },
        {
          "type": "patreon",
          "url": "https://www.patreon.com/feross"
        },
        {
          "type": "consulting",
          "url": "https://feross.org/support"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "queue-microtask": "^1.2.2"
      }
    },
    "node_modules/scheduler": {
      "version": "0.23.2",
      "resolved": "https://registry.npmjs.org/scheduler/-/scheduler-0.23.2.tgz",
      "integrity": "sha512-UOShsPwz7NrMUqhR6t0hWjFduvOzbtv7toDH1/hIrfRNIDBnnBWd0CwJTGvTpngVlmwGCdP9/Zl/tVrDqcuYzQ==",
      "license": "MIT",
      "dependencies": {
        "loose-envify": "^1.1.0"
      }
    },
    "node_modules/semver": {
      "version": "6.3.1",
      "resolved": "https://registry.npmjs.org/semver/-/semver-6.3.1.tgz",
      "integrity": "sha512-BR7VvDCVHO+q2xBEWskxS6DJE1qRnb7DxzUrogb71CWoSficBxYsiAGd+Kl0mmq/MprG9yArRkyrQxTO6XjMzA==",
      "dev": true,
      "license": "ISC",
      "bin": {
        "semver": "bin/semver.js"
      }
    },
    "node_modules/source-map-js": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/source-map-js/-/source-map-js-1.2.1.tgz",
      "integrity": "sha512-UXWMKhLOwVKb728IUtQPXxfYU+usdybtUrK/8uGE8CQMvrhOpwvzDBwj0QhSL7MQc7vIsISBG8VQ8+IDQxpfQA==",
      "dev": true,
      "license": "BSD-3-Clause",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/sucrase": {
      "version": "3.35.1",
      "resolved": "https://registry.npmjs.org/sucrase/-/sucrase-3.35.1.tgz",
      "integrity": "sha512-DhuTmvZWux4H1UOnWMB3sk0sbaCVOoQZjv8u1rDoTV0HTdGem9hkAZtl4JZy8P2z4Bg0nT+YMeOFyVr4zcG5Tw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jridgewell/gen-mapping": "^0.3.2",
        "commander": "^4.0.0",
        "lines-and-columns": "^1.1.6",
        "mz": "^2.7.0",
        "pirates": "^4.0.1",
        "tinyglobby": "^0.2.11",
        "ts-interface-checker": "^0.1.9"
      },
      "bin": {
        "sucrase": "bin/sucrase",
        "sucrase-node": "bin/sucrase-node"
      },
      "engines": {
        "node": ">=16 || 14 >=14.17"
      }
    },
    "node_modules/supports-preserve-symlinks-flag": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/supports-preserve-symlinks-flag/-/supports-preserve-symlinks-flag-1.0.0.tgz",
      "integrity": "sha512-ot0WnXS9fgdkgIcePe6RHNk1WA8+muPa6cSjeR3V8K27q9BB1rTE3R1p7Hv0z1ZyAc8s6Vvv8DIyWf681MAt0w==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/tailwindcss": {
      "version": "3.4.19",
      "resolved": "https://registry.npmjs.org/tailwindcss/-/tailwindcss-3.4.19.tgz",
      "integrity": "sha512-3ofp+LL8E+pK/JuPLPggVAIaEuhvIz4qNcf3nA1Xn2o/7fb7s/TYpHhwGDv1ZU3PkBluUVaF8PyCHcm48cKLWQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@alloc/quick-lru": "^5.2.0",
        "arg": "^5.0.2",
        "chokidar": "^3.6.0",
        "didyoumean": "^1.2.2",
        "dlv": "^1.1.3",
        "fast-glob": "^3.3.2",
        "glob-parent": "^6.0.2",
        "is-glob": "^4.0.3",
        "jiti": "^1.21.7",
        "lilconfig": "^3.1.3",
        "micromatch": "^4.0.8",
        "normalize-path": "^3.0.0",
        "object-hash": "^3.0.0",
        "picocolors": "^1.1.1",
        "postcss": "^8.4.47",
        "postcss-import": "^15.1.0",
        "postcss-js": "^4.0.1",
        "postcss-load-config": "^4.0.2 || ^5.0 || ^6.0",
        "postcss-nested": "^6.2.0",
        "postcss-selector-parser": "^6.1.2",
        "resolve": "^1.22.8",
        "sucrase": "^3.35.0"
      },
      "bin": {
        "tailwind": "lib/cli.js",
        "tailwindcss": "lib/cli.js"
      },
      "engines": {
        "node": ">=14.0.0"
      }
    },
    "node_modules/thenify": {
      "version": "3.3.1",
      "resolved": "https://registry.npmjs.org/thenify/-/thenify-3.3.1.tgz",
      "integrity": "sha512-RVZSIV5IG10Hk3enotrhvz0T9em6cyHBLkH/YAZuKqd8hRkKhSfCGIcP2KUY0EPxndzANBmNllzWPwak+bheSw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "any-promise": "^1.0.0"
      }
    },
    "node_modules/thenify-all": {
      "version": "1.6.0",
      "resolved": "https://registry.npmjs.org/thenify-all/-/thenify-all-1.6.0.tgz",
      "integrity": "sha512-RNxQH/qI8/t3thXJDwcstUO4zeqo64+Uy/+sNVRBx4Xn2OX+OZ9oP+iJnNFqplFra2ZUVeKCSa2oVWi3T4uVmA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "thenify": ">= 3.1.0 < 4"
      },
      "engines": {
        "node": ">=0.8"
      }
    },
    "node_modules/tinyglobby": {
      "version": "0.2.16",
      "resolved": "https://registry.npmjs.org/tinyglobby/-/tinyglobby-0.2.16.tgz",
      "integrity": "sha512-pn99VhoACYR8nFHhxqix+uvsbXineAasWm5ojXoN8xEwK5Kd3/TrhNn1wByuD52UxWRLy8pu+kRMniEi6Eq9Zg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "fdir": "^6.5.0",
        "picomatch": "^4.0.4"
      },
      "engines": {
        "node": ">=12.0.0"
      },
      "funding": {
        "url": "https://github.com/sponsors/SuperchupuDev"
      }
    },
    "node_modules/tinyglobby/node_modules/fdir": {
      "version": "6.5.0",
      "resolved": "https://registry.npmjs.org/fdir/-/fdir-6.5.0.tgz",
      "integrity": "sha512-tIbYtZbucOs0BRGqPJkshJUYdL+SDH7dVM8gjy+ERp3WAUjLEFJE+02kanyHtwjWOnwrKYBiwAmM0p4kLJAnXg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=12.0.0"
      },
      "peerDependencies": {
        "picomatch": "^3 || ^4"
      },
      "peerDependenciesMeta": {
        "picomatch": {
          "optional": true
        }
      }
    },
    "node_modules/tinyglobby/node_modules/picomatch": {
      "version": "4.0.4",
      "resolved": "https://registry.npmjs.org/picomatch/-/picomatch-4.0.4.tgz",
      "integrity": "sha512-QP88BAKvMam/3NxH6vj2o21R6MjxZUAd6nlwAS/pnGvN9IVLocLHxGYIzFhg6fUQ+5th6P4dv4eW9jX3DSIj7A==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/sponsors/jonschlinkert"
      }
    },
    "node_modules/to-regex-range": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/to-regex-range/-/to-regex-range-5.0.1.tgz",
      "integrity": "sha512-65P7iz6X5yEr1cwcgvQxbbIw7Uk3gOy5dIdtZ4rDveLqhrdJP+Li/Hx6tyK0NEb+2GCyneCMJiGqrADCSNk8sQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "is-number": "^7.0.0"
      },
      "engines": {
        "node": ">=8.0"
      }
    },
    "node_modules/ts-interface-checker": {
      "version": "0.1.13",
      "resolved": "https://registry.npmjs.org/ts-interface-checker/-/ts-interface-checker-0.1.13.tgz",
      "integrity": "sha512-Y/arvbn+rrz3JCKl9C4kVNfTfSm2/mEp5FSz5EsZSANGPSlQrpRI5M4PKF+mJnE52jOO90PnPSc3Ur3bTQw0gA==",
      "dev": true,
      "license": "Apache-2.0"
    },
    "node_modules/tslib": {
      "version": "2.8.1",
      "resolved": "https://registry.npmjs.org/tslib/-/tslib-2.8.1.tgz",
      "integrity": "sha512-oJFu94HQb+KVduSUQL7wnpmqnfmLsOA/nAh6b6EH0wCEoK0/mPeXU6c3wKDV83MkOuHPRHtSXKKU99IBazS/2w==",
      "license": "0BSD"
    },
    "node_modules/undici-types": {
      "version": "7.19.2",
      "resolved": "https://registry.npmjs.org/undici-types/-/undici-types-7.19.2.tgz",
      "integrity": "sha512-qYVnV5OEm2AW8cJMCpdV20CDyaN3g0AjDlOGf1OW4iaDEx8MwdtChUp4zu4H0VP3nDRF/8RKWH+IPp9uW0YGZg==",
      "license": "MIT"
    },
    "node_modules/update-browserslist-db": {
      "version": "1.2.3",
      "resolved": "https://registry.npmjs.org/update-browserslist-db/-/update-browserslist-db-1.2.3.tgz",
      "integrity": "sha512-Js0m9cx+qOgDxo0eMiFGEueWztz+d4+M3rGlmKPT+T4IS/jP4ylw3Nwpu6cpTTP8R1MAC1kF4VbdLt3ARf209w==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/browserslist"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/browserslist"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "escalade": "^3.2.0",
        "picocolors": "^1.1.1"
      },
      "bin": {
        "update-browserslist-db": "cli.js"
      },
      "peerDependencies": {
        "browserslist": ">= 4.21.0"
      }
    },
    "node_modules/util-deprecate": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/util-deprecate/-/util-deprecate-1.0.2.tgz",
      "integrity": "sha512-EPD5q1uXyFxJpCrLnCc1nHnq3gOa6DZBocAIiI2TaSCA7VCJ1UJDMagCzIkXNsUYfD1daK//LTEQ8xiIbrHtcw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/vite": {
      "version": "5.4.21",
      "resolved": "https://registry.npmjs.org/vite/-/vite-5.4.21.tgz",
      "integrity": "sha512-o5a9xKjbtuhY6Bi5S3+HvbRERmouabWbyUcpXXUA1u+GNUKoROi9byOJ8M0nHbHYHkYICiMlqxkg1KkYmm25Sw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "esbuild": "^0.21.3",
        "postcss": "^8.4.43",
        "rollup": "^4.20.0"
      },
      "bin": {
        "vite": "bin/vite.js"
      },
      "engines": {
        "node": "^18.0.0 || >=20.0.0"
      },
      "funding": {
        "url": "https://github.com/vitejs/vite?sponsor=1"
      },
      "optionalDependencies": {
        "fsevents": "~2.3.3"
      },
      "peerDependencies": {
        "@types/node": "^18.0.0 || >=20.0.0",
        "less": "*",
        "lightningcss": "^1.21.0",
        "sass": "*",
        "sass-embedded": "*",
        "stylus": "*",
        "sugarss": "*",
        "terser": "^5.4.0"
      },
      "peerDependenciesMeta": {
        "@types/node": {
          "optional": true
        },
        "less": {
          "optional": true
        },
        "lightningcss": {
          "optional": true
        },
        "sass": {
          "optional": true
        },
        "sass-embedded": {
          "optional": true
        },
        "stylus": {
          "optional": true
        },
        "sugarss": {
          "optional": true
        },
        "terser": {
          "optional": true
        }
      }
    },
    "node_modules/ws": {
      "version": "8.20.0",
      "resolved": "https://registry.npmjs.org/ws/-/ws-8.20.0.tgz",
      "integrity": "sha512-sAt8BhgNbzCtgGbt2OxmpuryO63ZoDk/sqaB/znQm94T4fCEsy/yV+7CdC1kJhOU9lboAEU7R3kquuycDoibVA==",
      "license": "MIT",
      "engines": {
        "node": ">=10.0.0"
      },
      "peerDependencies": {
        "bufferutil": "^4.0.1",
        "utf-8-validate": ">=5.0.2"
      },
      "peerDependenciesMeta": {
        "bufferutil": {
          "optional": true
        },
        "utf-8-validate": {
          "optional": true
        }
      }
    },
    "node_modules/yallist": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/yallist/-/yallist-3.1.1.tgz",
      "integrity": "sha512-a4UGQaWPH59mOXUYnAG2ewncQS4i4F43Tv3JoAM+s2VDAmS9NsK8GpDMLrCHPksFT7h3K6TOoUNn2pb7RoXx4g==",
      "dev": true,
      "license": "ISC"
    }
  }
}


//index.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Bratstvo Digital</title>
  </head>
  <body>
    <div id="root"></div>

    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>

//client.js

//main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App.jsx'
import '@/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)

//index.css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 0 0% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 0 0% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 0 0% 3.9%;
    --primary: 0 0% 9%;
    --primary-foreground: 0 0% 98%;
    --secondary: 0 0% 96.1%;
    --secondary-foreground: 0 0% 9%;
    --muted: 0 0% 96.1%;
    --muted-foreground: 0 0% 45.1%;
    --accent: 0 0% 96.1%;
    --accent-foreground: 0 0% 9%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 0 0% 89.8%;
    --input: 0 0% 89.8%;
    --ring: 0 0% 3.9%;
    --chart-1: 12 76% 61%;
    --chart-2: 173 58% 39%;
    --chart-3: 197 37% 24%;
    --chart-4: 43 74% 66%;
    --chart-5: 27 87% 67%;
    --radius: 0.5rem;
    --sidebar-background: 0 0% 98%;
    --sidebar-foreground: 240 5.3% 26.1%;
    --sidebar-primary: 240 5.9% 10%;
    --sidebar-primary-foreground: 0 0% 98%;
    --sidebar-accent: 240 4.8% 95.9%;
    --sidebar-accent-foreground: 240 5.9% 10%;
    --sidebar-border: 220 13% 91%;
    --sidebar-ring: 217.2 91.2% 59.8%;
  }

  .dark {
    --background: 0 0% 3.9%;
    --foreground: 0 0% 98%;
    --card: 0 0% 3.9%;
    --card-foreground: 0 0% 98%;
    --popover: 0 0% 3.9%;
    --popover-foreground: 0 0% 98%;
    --primary: 0 0% 98%;
    --primary-foreground: 0 0% 9%;
    --secondary: 0 0% 14.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 0 0% 14.9%;
    --muted-foreground: 0 0% 63.9%;
    --accent: 0 0% 14.9%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 0 0% 14.9%;
    --input: 0 0% 14.9%;
    --ring: 0 0% 83.1%;
    --chart-1: 220 70% 50%;
    --chart-2: 160 60% 45%;
    --chart-3: 30 80% 55%;
    --chart-4: 280 65% 60%;
    --chart-5: 340 75% 55%;
    --sidebar-background: 240 5.9% 10%;
    --sidebar-foreground: 240 4.8% 95.9%;
    --sidebar-primary: 224.3 76.3% 48%;
    --sidebar-primary-foreground: 0 0% 100%;
    --sidebar-accent: 240 3.7% 15.9%;
    --sidebar-accent-foreground: 240 4.8% 95.9%;
    --sidebar-border: 240 3.7% 15.9%;
    --sidebar-ring: 217.2 91.2% 59.8%;
  }
}



@layer base {
  * {
    @apply border-border outline-ring/50;
  }

  body {
    @apply bg-background text-foreground;
    overscroll-behavior: none;
    background: var(--c-bg);
  }

  button, a, nav a {
    -webkit-user-select: none;
    user-select: none;
  }
}

:root {
  --c-bg: #05090D;
  --c-surface: #0B1118;
  --c-text: #E6EDF3;
  --c-muted: #9BA6B2;
  --c-border: rgba(255, 255, 255, 0.07);
  --c-border-subtle: rgba(255, 255, 255, 0.05);
  --c-input-bg: rgba(255, 255, 255, 0.04);
  --c-input-border: rgba(255, 255, 255, 0.08);
  --c-nav: rgba(5, 9, 13, 0.93);
  --c-nav-border: rgba(255, 255, 255, 0.05);
}

html.light {
  --c-bg: #F1F5F9;
  --c-surface: #FFFFFF;
  --c-text: #0F172A;
  --c-muted: #64748B;
  --c-border: rgba(0, 0, 0, 0.09);
  --c-border-subtle: rgba(0, 0, 0, 0.06);
  --c-input-bg: rgba(0, 0, 0, 0.04);
  --c-input-border: rgba(0, 0, 0, 0.12);
  --c-nav: rgba(241, 245, 249, 0.95);
  --c-nav-border: rgba(0, 0, 0, 0.08);
}

//App.jsx
import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import { LanguageProvider } from './components/LanguageContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Systems from './pages/Systems';
import Demo from './pages/Demo';
import Pricing from './pages/Pricing';
import Shop from './pages/Shop';
import Setup from './pages/Setup';
import Admin from './pages/Admin';
import Settings from './pages/Settings';
import Dashboard from './pages/Dashboard';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center" style={{ background: '#05090D' }}>
        <div className="w-8 h-8 border-4 border-green-900 border-t-green-400 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (authError) {
    if (authError.type === 'user_not_registered') return <UserNotRegisteredError />;
    else if (authError.type === 'auth_required') { navigateToLogin(); return null; }
  }

  return (
    <LanguageProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/Home" replace />} />
        <Route element={<Layout />}>
          <Route path="/Home" element={<Home />} />
          <Route path="/Systems" element={<Systems />} />
          <Route path="/Demo" element={<Demo />} />
          <Route path="/Pricing" element={<Pricing />} />
          <Route path="/Shop" element={<Shop />} />
          <Route path="/Setup" element={<Setup />} />
          <Route path="/Admin" element={<Admin />} />
          <Route path="/Settings" element={<Settings />} />
          <Route path="/Dashboard" element={<Dashboard />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </LanguageProvider>
  );
};

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;

//Systems.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../components/LanguageContext';
import { X, CheckCircle, ChevronRight, ExternalLink } from 'lucide-react';

const systems = {
  en: [
    {
      id: 'preorder',
      emoji: '🍱',
      name: 'Food Preorder System',
      tagline: 'Take.app-style preorder platform',
      for: 'Bakers, food sellers, caterers, home cooks',
      desc: 'A professional preorder platform that lets customers browse your menu, select quantities, pick up time, and submit orders — all without calling or texting you. Every order lands neatly in your admin panel and WhatsApp.',
      features: ['Daily menu management', 'Quantity & slot limits', 'Customer order tracking', 'Auto WhatsApp confirmation', 'Order summary export', 'Payment via bank / QR'],
      useCases: ['Mama Zah Bakery takes 200+ preorders weekly with zero missed orders', 'Ahmad\'s Nasi Lemak reduced order chaos by 90%'],
      mockPreview: {
        header: '🍱 Mak Teh Catering — Daily Menu',
        items: [
          { name: 'Nasi Lemak Set A', price: 8.50, stock: 50 },
          { name: 'Nasi Goreng Kampung', price: 7.00, stock: 30 },
          { name: 'Mee Hoon Sup', price: 6.50, stock: 20 },
          { name: 'Kuih Lapis (6pcs)', price: 5.00, stock: 40 },
        ]
      },
      color: '#FF6B35',
      from: 149,
    },
    {
      id: 'product',
      emoji: '🛒',
      name: 'Product Order System',
      tagline: 'Structured product selling via WhatsApp',
      for: 'Dropshippers, online sellers, retailers, resellers',
      desc: 'Replace messy WhatsApp order screenshots with a professional ordering form. Customers choose products, variations, quantities — and you get a structured order summary automatically.',
      features: ['Product catalog with photos', 'Size/color/variant selection', 'Customer info auto-capture', 'Order number generation', 'Bulk order support', 'Delivery zone management'],
      useCases: ['Sarah\'s Hijab Store processes 500+ orders monthly', 'Dropshippers eliminated 3 hours of daily admin work'],
      mockPreview: {
        header: '👗 Zahra Collection — New Arrivals',
        items: [
          { name: 'Pleated Skirt Set', price: 89.00, stock: 15 },
          { name: 'Flowy Abaya', price: 145.00, stock: 8 },
          { name: 'Sport Hijab (3pcs)', price: 45.00, stock: 30 },
          { name: 'Premium Shawl', price: 55.00, stock: 22 },
        ]
      },
      color: '#4F46E5',
      from: 149,
    },
    {
      id: 'booking',
      emoji: '📅',
      name: 'Appointment Booking System',
      tagline: 'Smart scheduling for service businesses',
      for: 'Salons, clinics, tutors, photographers, mechanics',
      desc: 'A clean booking interface where clients pick their service, preferred date & time, and submit appointments. You get calendar-ready notifications and your schedule stays organized automatically.',
      features: ['Service menu with durations', 'Real-time slot availability', 'Calendar integration', 'Reminder notifications', 'Booking history', 'Cancel & reschedule flow'],
      useCases: ['Elite Salon went from 0 to 100% no-show reduction', 'Dr. Amir\'s clinic eliminated phone tag for appointments'],
      mockPreview: {
        header: '💇 Glamour Studio — Book Now',
        items: [
          { name: 'Haircut + Blow Dry', price: 65.00, stock: null, duration: '1hr' },
          { name: 'Hair Colour (Full)', price: 220.00, stock: null, duration: '3hrs' },
          { name: 'Facial Treatment', price: 180.00, stock: null, duration: '90min' },
          { name: 'Nail Art Fullset', price: 95.00, stock: null, duration: '2hrs' },
        ]
      },
      color: '#0EA5E9',
      from: 149,
    },
    {
      id: 'ecommerce',
      emoji: '🏪',
      name: 'eCommerce Store System',
      tagline: 'Full online store with cart & checkout',
      for: 'Any business wanting a professional online store',
      desc: 'A complete online store with product pages, shopping cart, checkout, and order management. No Shopify subscription needed. Fully custom design, your domain, your brand.',
      features: ['Full product catalog', 'Shopping cart & checkout', 'Payment via bank/QR/e-wallet', 'Order management dashboard', 'Inventory tracking', 'Discount codes & promotions'],
      useCases: ['KiddieLand Store went from Instagram DMs to RM50k monthly revenue', 'Organic Beauty Co. reduced customer service 70%'],
      mockPreview: {
        header: '🏪 NaturaCraft Store',
        items: [
          { name: 'Argan Oil Serum', price: 68.00, stock: 45 },
          { name: 'Rose Water Toner', price: 42.00, stock: 60 },
          { name: 'Vitamin C Mask', price: 35.00, stock: 28 },
          { name: 'Collagen Cream', price: 89.00, stock: 17 },
        ]
      },
      color: '#16C47F',
      from: 590,
    },
    {
      id: 'membership',
      emoji: '👑',
      name: 'Membership System',
      tagline: 'Recurring subscription & loyalty platform',
      for: 'Gyms, academies, content creators, exclusive clubs',
      desc: 'Manage members, subscriptions, tiers, and access levels. Members get digital cards, track their status, and renew easily. You get automated billing reminders and member analytics.',
      features: ['Tiered membership levels', 'Digital membership card', 'Auto renewal reminders', 'Member portal', 'Attendance tracking', 'Exclusive content gating'],
      useCases: ['FitLife Gym manages 300+ members with zero manual admin', 'Quran Academy increased retention by 40%'],
      mockPreview: {
        header: '👑 FitCore Gym — Membership',
        items: [
          { name: 'Basic Plan', price: 99.00, stock: null, duration: '/month' },
          { name: 'Pro Plan', price: 179.00, stock: null, duration: '/month' },
          { name: 'Elite Plan', price: 299.00, stock: null, duration: '/month' },
          { name: 'Annual Pass', price: 1490.00, stock: null, duration: '/year' },
        ]
      },
      color: '#F59E0B',
      from: 590,
    },
    {
      id: 'pos',
      emoji: '🏷️',
      name: 'POS System',
      tagline: 'Point-of-sale for physical businesses',
      for: 'Cafes, retail shops, market traders, small restaurants',
      desc: 'A tablet-friendly POS system for walk-in customers. Process orders, accept payments, print receipts, and view end-of-day reports — all from a simple, clean interface.',
      features: ['Product quick-add buttons', 'Cash & e-wallet payment', 'Receipt printing support', 'Daily sales reports', 'Multiple staff logins', 'Inventory sync'],
      useCases: ['Kopi Kita Cafe serves 150+ daily orders with 1 device', 'Fashion outlet cut checkout time by 60%'],
      mockPreview: {
        header: '🏷️ Kopi Kita — POS Terminal',
        items: [
          { name: 'Kopi O', price: 3.50, stock: null },
          { name: 'Teh Tarik', price: 3.50, stock: null },
          { name: 'Roti Bakar Set', price: 8.00, stock: null },
          { name: 'Nasi Lemak', price: 7.50, stock: null },
        ]
      },
      color: '#8B5CF6',
      from: 890,
    },
    {
      id: 'invoice',
      emoji: '🧾',
      name: 'Invoice & Quotation System',
      tagline: 'Professional invoicing for freelancers & SMEs',
      for: 'Freelancers, contractors, service providers, agencies',
      desc: 'Generate professional invoices and quotations in seconds. Send via WhatsApp or email, track payment status, and maintain your financial records — without Excel headaches.',
      features: ['Branded invoice templates', 'Quotation builder', 'Payment status tracking', 'PDF download & share', 'Client database', 'Recurring invoice support'],
      useCases: ['Graphic designer bills 20+ clients monthly in minutes', 'Contractor firm cut invoice time from 2hrs to 5min'],
      mockPreview: {
        header: '🧾 INV-2024-0042 · Creative Studio',
        items: [
          { name: 'Logo Design Package', price: 800.00, stock: null },
          { name: 'Business Card Design', price: 200.00, stock: null },
          { name: 'Social Media Kit', price: 450.00, stock: null },
          { name: 'Revision (3 rounds)', price: 150.00, stock: null },
        ]
      },
      color: '#EC4899',
      from: 149,
    },
    {
      id: 'qr-order',
      emoji: '📱',
      name: 'QR Table Ordering System',
      tagline: 'Scan to order — no staff needed',
      for: 'Restaurants, cafes, food courts, hotels',
      desc: 'Customers scan the QR code on their table, browse the digital menu, and place orders directly. Orders go straight to the kitchen display. No more shouting for waiters.',
      features: ['QR code per table', 'Digital menu with photos', 'Order goes to kitchen display', 'Real-time order status', 'Add-ons & customization', 'Bill split support'],
      useCases: ['Warung Pak Mat reduced staff needs by 50%', 'Hotel in-room dining went fully contactless'],
      mockPreview: {
        header: '📱 Table 7 — QR Menu',
        items: [
          { name: 'Grilled Chicken Chop', price: 18.90, stock: null },
          { name: 'Aglio Olio Pasta', price: 16.50, stock: null },
          { name: 'Mushroom Soup', price: 9.90, stock: null },
          { name: 'Fresh Lemonade', price: 7.50, stock: null },
        ]
      },
      color: '#14B8A6',
      from: 590,
    },
    {
      id: 'crm',
      emoji: '📊',
      name: 'CRM & Lead Management',
      tagline: 'Never lose a lead again',
      for: 'Sales teams, agents, consultants, agencies',
      desc: 'Track every lead from first contact to closed deal. Assign follow-ups, set reminders, view pipeline analytics, and close more deals with less effort.',
      features: ['Lead pipeline (Kanban)', 'Follow-up task scheduler', 'WhatsApp integration', 'Deal value tracking', 'Team assignment', 'Conversion analytics'],
      useCases: ['Property agent increased closing rate by 35%', 'Insurance agency manages 500+ leads efficiently'],
      mockPreview: {
        header: '📊 Sales Pipeline — Active Leads',
        items: [
          { name: 'Ahmad Razif — Website Inquiry', price: 1490, stock: null, stage: 'Proposal' },
          { name: 'Siti Norma — Shop System', price: 590, stock: null, stage: 'Negotiation' },
          { name: 'Lee Wei — Booking System', price: 890, stock: null, stage: 'New Lead' },
          { name: 'Priya K. — Full Package', price: 2990, stock: null, stage: 'Won ✓' },
        ]
      },
      color: '#6366F1',
      from: 590,
    },
    {
      id: 'visitor',
      emoji: '🪪',
      name: 'Visitor Management System',
      tagline: 'Digital check-in for offices & events',
      for: 'Offices, factories, events, schools, condominiums',
      desc: 'Replace paper logbooks with a professional digital visitor system. Visitors check in via iPad/tablet, receive digital passes, and hosts get instant notifications.',
      features: ['Digital sign-in form', 'Host notification (WhatsApp/email)', 'Visitor badge printing', 'Visit history log', 'Blacklist management', 'Analytics dashboard'],
      useCases: ['Tech company replaced 3 receptionist tasks with 1 system', 'Event organizer managed 2,000 attendees seamlessly'],
      mockPreview: {
        header: '🪪 TechHub KL — Visitor Check-In',
        items: [
          { name: 'Today\'s Visitors', price: 24, stock: null, label: 'check-ins' },
          { name: 'Expected Today', price: 12, stock: null, label: 'pre-registered' },
          { name: 'Avg. Daily Visits', price: 18, stock: null, label: 'this month' },
          { name: 'Active Badges', price: 6, stock: null, label: 'currently in' },
        ]
      },
      color: '#F97316',
      from: 590,
    },
  ],
  my: [
    {
      id: 'preorder',
      emoji: '🍱',
      name: 'Sistem Pra-Pesanan Makanan',
      tagline: 'Platform pra-pesanan gaya Take.app',
      for: 'Pengusaha bakeri, penjual makanan, katering, masakan rumah',
      desc: 'Platform pra-pesanan profesional yang membolehkan pelanggan semak menu, pilih kuantiti, masa ambil, dan hantar pesanan — tanpa perlu menelefon atau SMS. Setiap pesanan tersusun rapi dalam panel admin dan WhatsApp anda.',
      features: ['Pengurusan menu harian', 'Had kuantiti & slot', 'Penjejakan pesanan pelanggan', 'Konfirmasi WhatsApp automatik', 'Eksport ringkasan pesanan', 'Pembayaran melalui bank / QR'],
      useCases: ['Bakeri Mama Zah terima 200+ pra-pesanan mingguan tanpa pesanan hilang', 'Ahmad Nasi Lemak kurangkan kekacauan pesanan sebanyak 90%'],
      mockPreview: {
        header: '🍱 Katering Mak Teh — Menu Hari Ini',
        items: [
          { name: 'Nasi Lemak Set A', price: 8.50, stock: 50 },
          { name: 'Nasi Goreng Kampung', price: 7.00, stock: 30 },
          { name: 'Mee Hoon Sup', price: 6.50, stock: 20 },
          { name: 'Kuih Lapis (6pcs)', price: 5.00, stock: 40 },
        ]
      },
      color: '#FF6B35', from: 149,
    },
    {
      id: 'product', emoji: '🛒', name: 'Sistem Pesanan Produk', tagline: 'Jualan produk berstruktur via WhatsApp',
      for: 'Dropshipper, penjual dalam talian, peruncit, reseller',
      desc: 'Gantikan tangkapan skrin pesanan WhatsApp yang bersepah dengan borang pesanan profesional. Pelanggan pilih produk, variasi, kuantiti — dan anda dapat ringkasan pesanan berstruktur secara automatik.',
      features: ['Katalog produk dengan foto', 'Pilihan saiz/warna/variasi', 'Tangkap info pelanggan automatik', 'Jana nombor pesanan', 'Sokongan pesanan pukal', 'Pengurusan zon penghantaran'],
      useCases: ['Kedai Hijab Sarah proses 500+ pesanan bulanan', 'Dropshipper hapuskan 3 jam kerja admin harian'],
      mockPreview: { header: '👗 Koleksi Zahra — Tiba Baru', items: [{ name: 'Set Skirt Berlipat', price: 89.00, stock: 15 }, { name: 'Abaya Mengalir', price: 145.00, stock: 8 }, { name: 'Hijab Sukan (3pcs)', price: 45.00, stock: 30 }, { name: 'Shawl Premium', price: 55.00, stock: 22 }] },
      color: '#4F46E5', from: 149,
    },
    {
      id: 'booking', emoji: '📅', name: 'Sistem Tempahan Temujanji', tagline: 'Penjadualan pintar untuk perniagaan perkhidmatan',
      for: 'Salun, klinik, tutor, jurugambar, mekanik',
      desc: 'Antara muka tempahan yang bersih di mana pelanggan pilih perkhidmatan, tarikh & masa pilihan, dan hantar temujanji. Anda dapat notifikasi sedia-kalendar dan jadual anda teratur secara automatik.',
      features: ['Menu perkhidmatan dengan tempoh masa', 'Ketersediaan slot masa nyata', 'Integrasi kalendar', 'Notifikasi peringatan', 'Sejarah tempahan', 'Aliran batal & jadual semula'],
      useCases: ['Elite Salon kurangkan ketidakhadiran sebanyak 100%', 'Klinik Dr. Amir hapuskan tuntutan telefon untuk temujanji'],
      mockPreview: { header: '💇 Studio Glamour — Tempah Sekarang', items: [{ name: 'Gunting + Blow Dry', price: 65.00, stock: null, duration: '1jam' }, { name: 'Warna Rambut (Penuh)', price: 220.00, stock: null, duration: '3jam' }, { name: 'Rawatan Muka', price: 180.00, stock: null, duration: '90min' }, { name: 'Kuku Seni Fullset', price: 95.00, stock: null, duration: '2jam' }] },
      color: '#0EA5E9', from: 149,
    },
    {
      id: 'ecommerce', emoji: '🏪', name: 'Sistem Kedai eCommerce', tagline: 'Kedai dalam talian penuh dengan troli & pembayaran',
      for: 'Mana-mana perniagaan yang mahukan kedai dalam talian profesional',
      desc: 'Kedai dalam talian lengkap dengan halaman produk, troli beli-belah, pembayaran, dan pengurusan pesanan. Tiada langganan Shopify diperlukan. Reka bentuk khas sepenuhnya, domain anda, jenama anda.',
      features: ['Katalog produk penuh', 'Troli beli-belah & pembayaran', 'Bayaran melalui bank/QR/e-dompet', 'Papan pemuka pengurusan pesanan', 'Penjejakan inventori', 'Kod diskaun & promosi'],
      useCases: ['KiddieLand Store dari DM Instagram ke pendapatan RM50k bulanan', 'Organic Beauty Co. kurangkan khidmat pelanggan 70%'],
      mockPreview: { header: '🏪 NaturaCraft Store', items: [{ name: 'Serum Argan Oil', price: 68.00, stock: 45 }, { name: 'Toner Air Ros', price: 42.00, stock: 60 }, { name: 'Topeng Vitamin C', price: 35.00, stock: 28 }, { name: 'Krim Kolagen', price: 89.00, stock: 17 }] },
      color: '#16C47F', from: 590,
    },
    {
      id: 'membership', emoji: '👑', name: 'Sistem Keahlian', tagline: 'Platform langganan berulang & kesetiaan',
      for: 'Gim, akademi, pencipta kandungan, kelab eksklusif',
      desc: 'Urus ahli, langganan, tahap, dan tahap akses. Ahli mendapat kad digital, jejak status mereka, dan perbaharui dengan mudah. Anda mendapat peringatan pengebilan automatik dan analitik ahli.',
      features: ['Tahap keahlian bertingkat', 'Kad keahlian digital', 'Peringatan pembaharuan automatik', 'Portal ahli', 'Penjejakan kehadiran', 'Penutupan kandungan eksklusif'],
      useCases: ['FitLife Gym urus 300+ ahli tanpa admin manual', 'Akademi Quran tingkatkan pengekalan sebanyak 40%'],
      mockPreview: { header: '👑 Gim FitCore — Keahlian', items: [{ name: 'Pelan Asas', price: 99.00, stock: null, duration: '/bulan' }, { name: 'Pelan Pro', price: 179.00, stock: null, duration: '/bulan' }, { name: 'Pelan Elite', price: 299.00, stock: null, duration: '/bulan' }, { name: 'Pas Tahunan', price: 1490.00, stock: null, duration: '/tahun' }] },
      color: '#F59E0B', from: 590,
    },
    {
      id: 'pos', emoji: '🏷️', name: 'Sistem POS', tagline: 'Titik jualan untuk perniagaan fizikal',
      for: 'Kafe, kedai runcit, peniaga pasar, restoran kecil',
      desc: 'Sistem POS mesra tablet untuk pelanggan walk-in. Proses pesanan, terima pembayaran, cetak resit, dan lihat laporan akhir hari — semuanya dari antara muka yang mudah dan bersih.',
      features: ['Butang tambah produk pantas', 'Bayaran tunai & e-dompet', 'Sokongan cetak resit', 'Laporan jualan harian', 'Login kakitangan berbilang', 'Sinkronisasi inventori'],
      useCases: ['Kafe Kopi Kita layan 150+ pesanan harian dengan 1 peranti', 'Kedai fesyen kurangkan masa pembayaran 60%'],
      mockPreview: { header: '🏷️ Kopi Kita — Terminal POS', items: [{ name: 'Kopi O', price: 3.50, stock: null }, { name: 'Teh Tarik', price: 3.50, stock: null }, { name: 'Set Roti Bakar', price: 8.00, stock: null }, { name: 'Nasi Lemak', price: 7.50, stock: null }] },
      color: '#8B5CF6', from: 890,
    },
    {
      id: 'invoice', emoji: '🧾', name: 'Sistem Invois & Sebut Harga', tagline: 'Invois profesional untuk freelancer & PKS',
      for: 'Freelancer, kontraktor, penyedia perkhidmatan, agensi',
      desc: 'Jana invois dan sebut harga profesional dalam beberapa saat. Hantar melalui WhatsApp atau e-mel, jejak status pembayaran, dan kekalkan rekod kewangan anda — tanpa kesusahan Excel.',
      features: ['Templat invois berjenama', 'Pembina sebut harga', 'Penjejakan status pembayaran', 'Muat turun & kongsi PDF', 'Pangkalan data pelanggan', 'Sokongan invois berulang'],
      useCases: ['Pereka grafik bil 20+ pelanggan bulanan dalam minit', 'Firma kontraktor kurangkan masa invois dari 2jam ke 5min'],
      mockPreview: { header: '🧾 INV-2024-0042 · Studio Kreatif', items: [{ name: 'Pakej Reka Logo', price: 800.00, stock: null }, { name: 'Reka Kad Perniagaan', price: 200.00, stock: null }, { name: 'Kit Media Sosial', price: 450.00, stock: null }, { name: 'Semakan (3 pusingan)', price: 150.00, stock: null }] },
      color: '#EC4899', from: 149,
    },
    {
      id: 'qr-order', emoji: '📱', name: 'Sistem Pesanan QR Meja', tagline: 'Imbas untuk pesan — tanpa perlu kakitangan',
      for: 'Restoran, kafe, pusat makanan, hotel',
      desc: 'Pelanggan imbas kod QR di meja mereka, semak menu digital, dan buat pesanan terus. Pesanan terus ke paparan dapur. Tiada lagi menjerit untuk pelayan.',
      features: ['Kod QR setiap meja', 'Menu digital dengan foto', 'Pesanan ke paparan dapur', 'Status pesanan masa nyata', 'Tambahan & penyesuaian', 'Sokongan bahagi bil'],
      useCases: ['Warung Pak Mat kurangkan keperluan kakitangan 50%', 'Penghantaran dalam bilik hotel menjadi tanpa sentuhan sepenuhnya'],
      mockPreview: { header: '📱 Meja 7 — Menu QR', items: [{ name: 'Chop Ayam Panggang', price: 18.90, stock: null }, { name: 'Pasta Aglio Olio', price: 16.50, stock: null }, { name: 'Sup Cendawan', price: 9.90, stock: null }, { name: 'Limau Segar', price: 7.50, stock: null }] },
      color: '#14B8A6', from: 590,
    },
    {
      id: 'crm', emoji: '📊', name: 'CRM & Pengurusan Prospek', tagline: 'Jangan pernah hilangkan prospek lagi',
      for: 'Pasukan jualan, ejen, perunding, agensi',
      desc: 'Jejak setiap prospek dari kenalan pertama hingga urusan ditutup. Tugaskan susulan, tetapkan peringatan, lihat analitik saluran, dan tutup lebih banyak urusan dengan kurang usaha.',
      features: ['Saluran prospek (Kanban)', 'Penjadual tugas susulan', 'Integrasi WhatsApp', 'Penjejakan nilai urusan', 'Penugasan pasukan', 'Analitik penukaran'],
      useCases: ['Ejen hartanah tingkatkan kadar penutupan 35%', 'Syarikat insurans urus 500+ prospek dengan cekap'],
      mockPreview: { header: '📊 Saluran Jualan — Prospek Aktif', items: [{ name: 'Ahmad Razif — Pertanyaan Laman Web', price: 1490, stock: null, stage: 'Cadangan' }, { name: 'Siti Norma — Sistem Kedai', price: 590, stock: null, stage: 'Rundingan' }, { name: 'Lee Wei — Sistem Tempahan', price: 890, stock: null, stage: 'Prospek Baru' }, { name: 'Priya K. — Pakej Penuh', price: 2990, stock: null, stage: 'Menang ✓' }] },
      color: '#6366F1', from: 590,
    },
    {
      id: 'visitor', emoji: '🪪', name: 'Sistem Pengurusan Pelawat', tagline: 'Daftar masuk digital untuk pejabat & acara',
      for: 'Pejabat, kilang, acara, sekolah, kondominium',
      desc: 'Gantikan buku log kertas dengan sistem pelawat digital yang profesional. Pelawat daftar masuk melalui iPad/tablet, terima pas digital, dan tuan rumah mendapat notifikasi segera.',
      features: ['Borang daftar masuk digital', 'Notifikasi tuan rumah (WhatsApp/e-mel)', 'Cetak lencana pelawat', 'Log sejarah lawatan', 'Pengurusan senarai hitam', 'Papan pemuka analitik'],
      useCases: ['Syarikat teknologi gantikan 3 tugas resepsionis dengan 1 sistem', 'Penganjur acara urus 2,000 peserta dengan lancar'],
      mockPreview: { header: '🪪 TechHub KL — Daftar Masuk Pelawat', items: [{ name: 'Pelawat Hari Ini', price: 24, stock: null, label: 'daftar masuk' }, { name: 'Dijangka Hari Ini', price: 12, stock: null, label: 'pra-daftar' }, { name: 'Purata Lawatan Harian', price: 18, stock: null, label: 'bulan ini' }, { name: 'Lencana Aktif', price: 6, stock: null, label: 'sedang dalam' }] },
      color: '#F97316', from: 590,
    },
  ]
};

const labels = {
  en: {
    badge: 'All Systems', title: 'Choose Your Business System', sub: '10 ready-made digital systems. Pick one, we build it for you within 24 hours.',
    for: 'Perfect for', features: 'Key Features', from: 'From', oneTime: 'one-time setup',
    tryDemo: 'Try Live Demo', getSystem: 'Get This System', viewDetails: 'View Details', close: 'Close',
    realCase: 'Real Results',
    previewLabel: 'Live Preview',
    all: 'All', popular: 'Popular', new: 'New',
  },
  my: {
    badge: 'Semua Sistem', title: 'Pilih Sistem Perniagaan Anda', sub: '10 sistem digital sedia guna. Pilih satu, kami bina untuk anda dalam 24 jam.',
    for: 'Sesuai untuk', features: 'Ciri Utama', from: 'Dari', oneTime: 'setup sekali bayar',
    tryDemo: 'Cuba Demo', getSystem: 'Dapatkan Sistem Ini', viewDetails: 'Lihat Perincian', close: 'Tutup',
    realCase: 'Hasil Sebenar',
    previewLabel: 'Pratonton',
    all: 'Semua', popular: 'Popular', new: 'Baru',
  }
};

function MockPreview({ system }) {
  const [cart, setCart] = useState([]);
  const items = system.mockPreview.items;
  const addToCart = (item) => setCart(prev => {
    const found = prev.find(i => i.name === item.name);
    if (found) return prev.map(i => i.name === item.name ? { ...i, qty: i.qty + 1 } : i);
    return [...prev, { ...item, qty: 1 }];
  });

  return (
    <div className="rounded-xl overflow-hidden text-xs" style={{ background: '#075E54', minHeight: 220 }}>
      <div className="px-3 py-2.5 font-bold text-white text-xs" style={{ background: system.color }}>
        {system.mockPreview.header}
      </div>
      <div className="p-3 space-y-2 bg-white/5">
        {items.map((item, i) => (
          <div key={i} className="flex items-center justify-between p-2 rounded-lg" style={{ background: 'rgba(255,255,255,0.1)' }}>
            <span className="text-white font-medium">{item.name}</span>
            <div className="flex items-center gap-2">
              <span className="text-green-300 font-bold">
                {typeof item.price === 'number' && item.price > 100
                  ? `RM${item.price.toLocaleString()}`
                  : item.label
                    ? `${item.price} ${item.label}`
                    : item.stage
                      ? item.stage
                      : item.duration
                        ? `RM${item.price} · ${item.duration}`
                        : `RM${item.price.toFixed(2)}`}
              </span>
              {!item.label && !item.stage && (
                <button onClick={() => addToCart(item)}
                  className="w-5 h-5 rounded text-xs font-bold flex items-center justify-center"
                  style={{ background: '#16C47F', color: '#05090D' }}>+</button>
              )}
            </div>
          </div>
        ))}
      </div>
      {cart.length > 0 && (
        <div className="px-3 py-2 flex items-center justify-between" style={{ background: '#128C7E' }}>
          <span className="text-white text-xs">{cart.reduce((s, i) => s + i.qty, 0)} item(s)</span>
          <button className="px-3 py-1 rounded-lg text-xs font-bold" style={{ background: '#16C47F', color: '#05090D' }}>
            RM{cart.reduce((s, i) => s + i.price * i.qty, 0).toFixed(2)} →
          </button>
        </div>
      )}
    </div>
  );
}

export default function Systems() {
  const { lang } = useLang();
  const c = labels[lang];
  const list = systems[lang];
  const [selected, setSelected] = useState(null);

  return (
    <div style={{ background: 'var(--c-bg)', minHeight: '100vh' }}>
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#16C47F' }}>{c.badge}</p>
            <h1 className="text-4xl md:text-5xl font-black mb-4" style={{ color: 'var(--c-text)' }}>{c.title}</h1>
            <p className="text-base max-w-xl mx-auto" style={{ color: 'var(--c-muted)' }}>{c.sub}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {list.map((sys, i) => (
              <div key={sys.id}
                className="rounded-2xl flex flex-col transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden"
                style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border-subtle)' }}
                onClick={() => setSelected(sys)}>
                {/* Color bar */}
                <div className="h-1.5" style={{ background: sys.color }} />
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-3xl">{sys.emoji}</div>
                    <span className="text-xs font-bold px-2 py-1 rounded-lg"
                      style={{ background: `${sys.color}20`, color: sys.color }}>
                      {c.from} RM{sys.from}
                    </span>
                  </div>
                  <h3 className="font-black text-sm mb-1" style={{ color: 'var(--c-text)' }}>{sys.name}</h3>
                  <p className="text-xs mb-3" style={{ color: sys.color }}>{sys.tagline}</p>
                  <p className="text-xs leading-relaxed mb-4 flex-1" style={{ color: 'var(--c-muted)' }}>
                    {sys.desc.substring(0, 100)}...
                  </p>
                  <div className="mb-4">
                    <p className="text-xs mb-2" style={{ color: 'var(--c-muted)', opacity: 0.7 }}>{c.for}:</p>
                    <p className="text-xs font-medium" style={{ color: 'var(--c-text)' }}>{sys.for}</p>
                  </div>
                  <button className="w-full py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all"
                    style={{ background: `${sys.color}15`, color: sys.color, border: `1px solid ${sys.color}30` }}>
                    {c.viewDetails} <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl"
            style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}
            onClick={e => e.stopPropagation()}>

            {/* Header */}
            <div className="px-7 py-5 sticky top-0 z-10 flex items-center justify-between"
              style={{ background: 'var(--c-surface)', borderBottom: '1px solid var(--c-border)', borderTop: `4px solid ${selected.color}` }}>
              <div className="flex items-center gap-3">
                <span className="text-3xl">{selected.emoji}</span>
                <div>
                  <h2 className="font-black text-lg" style={{ color: 'var(--c-text)' }}>{selected.name}</h2>
                  <p className="text-sm" style={{ color: selected.color }}>{selected.tagline}</p>
                </div>
              </div>
              <button onClick={() => setSelected(null)} style={{ color: 'var(--c-muted)' }}><X size={22} /></button>
            </div>

            <div className="p-7 grid md:grid-cols-2 gap-7">
              {/* Left */}
              <div className="space-y-6">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--c-muted)' }}>{c.for}</p>
                  <p className="text-sm font-medium" style={{ color: 'var(--c-text)' }}>{selected.for}</p>
                </div>
                <div>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--c-muted)' }}>{selected.desc}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--c-muted)' }}>{c.features}</p>
                  <ul className="space-y-2">
                    {selected.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm" style={{ color: 'var(--c-text)' }}>
                        <CheckCircle size={14} className="mt-0.5 shrink-0" style={{ color: '#16C47F' }} /> {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--c-muted)' }}>{c.realCase}</p>
                  {selected.useCases.map((u, i) => (
                    <div key={i} className="p-3 rounded-xl mb-2 text-sm italic" style={{ background: 'var(--c-bg)', color: 'var(--c-muted)' }}>
                      "{u}"
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-black" style={{ color: selected.color }}>RM{selected.from}</span>
                  <span className="text-sm" style={{ color: 'var(--c-muted)' }}>{c.oneTime}</span>
                </div>
              </div>

              {/* Right: Preview */}
              <div className="space-y-4">
                <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--c-muted)' }}>{c.previewLabel}</p>
                <MockPreview system={selected} />
                <div className="flex flex-col gap-3 pt-2">
                  <Link to="/Demo"
                    className="py-3 rounded-xl font-bold text-sm text-center flex items-center justify-center gap-2 transition-all hover:brightness-110"
                    style={{ background: `${selected.color}15`, color: selected.color, border: `1px solid ${selected.color}30` }}
                    onClick={() => setSelected(null)}>
                    <ExternalLink size={15} /> {c.tryDemo}
                  </Link>
                  <Link to="/Setup"
                    className="py-3 rounded-xl font-bold text-sm text-center transition-all hover:brightness-110"
                    style={{ background: '#16C47F', color: '#05090D' }}
                    onClick={() => setSelected(null)}>
                    {c.getSystem} →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

//Signup.jsx
export default function Signup() {
  return <div className="p-10">Signup Page</div>;
}

//Setup.jsx
import { useState } from 'react';
import { useLang } from '../components/LanguageContext';
import { Check, ChevronRight, ChevronLeft } from 'lucide-react';

const content = {
  en: {
    label: 'Get Started',
    title: 'Start Your Setup',
    subtitle: "Tell us about your business and we'll get back to you within 24 hours.",
    steps: ['Your Business', 'System Needs', 'Confirm'],
    namePlaceholder: 'Business Name',
    ownerPlaceholder: 'Your Name',
    phonePlaceholder: 'WhatsApp Number (+60...)',
    emailPlaceholder: 'Email Address',
    industryLabel: 'Industry',
    industries: ['Retail', 'F&B', 'Services', 'Healthcare', 'Education', 'Other'],
    systemLabel: 'Which system do you need?',
    systems: ['Food Preorder System', 'Product Order System', 'Service Booking System', 'Custom System'],
    packageLabel: 'Preferred package',
    packages: ['Starter (RM149)', 'Growth (RM490)', 'Professional (RM890)', 'Enterprise (RM1,190)', "I'm not sure yet"],
    budgetLabel: 'Monthly maintenance?',
    budgets: ['No thanks', 'Basic Care (RM50/mo)', 'Standard Care (RM100/mo)', 'Pro Care (RM150/mo)'],
    notesPlaceholder: 'Tell us more about your business (optional)',
    next: 'Next', back: 'Back', submit: 'Send via WhatsApp',
    confirmTitle: 'Review Your Request',
    confirmSub: "We'll contact you within 24 hours to confirm your setup.",
  },
  my: {
    label: 'Mulakan',
    title: 'Mulakan Setup Anda',
    subtitle: 'Beritahu kami tentang perniagaan anda dan kami akan menghubungi anda dalam 24 jam.',
    steps: ['Perniagaan Anda', 'Keperluan Sistem', 'Sahkan'],
    namePlaceholder: 'Nama Perniagaan',
    ownerPlaceholder: 'Nama Anda',
    phonePlaceholder: 'Nombor WhatsApp (+60...)',
    emailPlaceholder: 'Alamat E-mel',
    industryLabel: 'Industri',
    industries: ['Runcit', 'F&B', 'Perkhidmatan', 'Kesihatan', 'Pendidikan', 'Lain-lain'],
    systemLabel: 'Sistem yang anda perlukan?',
    systems: ['Sistem Pra-Pesanan Makanan', 'Sistem Pesanan Produk', 'Sistem Tempahan Perkhidmatan', 'Sistem Tersuai'],
    packageLabel: 'Pakej pilihan',
    packages: ['Starter (RM149)', 'Growth (RM490)', 'Professional (RM890)', 'Enterprise (RM1,190)', 'Belum pasti'],
    budgetLabel: 'Penyelenggaraan bulanan?',
    budgets: ['Tidak perlu', 'Penjagaan Asas (RM50/bln)', 'Penjagaan Standard (RM100/bln)', 'Penjagaan Pro (RM150/bln)'],
    notesPlaceholder: 'Ceritakan lebih lanjut tentang perniagaan anda (pilihan)',
    next: 'Seterusnya', back: 'Kembali', submit: 'Hantar via WhatsApp',
    confirmTitle: 'Semak Permintaan Anda',
    confirmSub: 'Kami akan menghubungi anda dalam 24 jam untuk mengesahkan setup anda.',
  }
};

export default function Setup() {
  const { lang } = useLang();
  const c = content[lang];
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: '', owner: '', phone: '', email: '', industry: '', system: '', package: '', budget: '', notes: '' });

  const set = (key, val) => setForm(prev => ({ ...prev, [key]: val }));
  const canNext1 = form.name && form.owner && form.phone && form.industry;
  const canNext2 = form.system && form.package;

  const msg = `Hi Bratstvo Digital! I want to start my setup.\n\nBusiness: ${form.name}\nOwner: ${form.owner}\nPhone: ${form.phone}\nEmail: ${form.email}\nIndustry: ${form.industry}\nSystem: ${form.system}\nPackage: ${form.package}\nMaintenance: ${form.budget || 'Not selected'}\nNotes: ${form.notes || 'None'}`;

  return (
    <div style={{ background: 'var(--c-bg)', minHeight: '100vh' }}>
      <section className="py-20 px-6">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#16C47F' }}>{c.label}</p>
            <h1 className="text-4xl font-black mb-4" style={{ color: 'var(--c-text)' }}>{c.title}</h1>
            <p className="text-base" style={{ color: 'var(--c-muted)' }}>{c.subtitle}</p>
          </div>

          {/* Step indicator */}
          <div className="flex items-center justify-center gap-3 mb-10">
            {[1, 2, 3].map(n => (
              <div key={n} className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ background: step >= n ? '#16C47F' : 'var(--c-border)', color: step >= n ? '#05090D' : 'var(--c-muted)' }}>
                    {step > n ? <Check size={12} /> : n}
                  </div>
                  <span className="text-xs hidden sm:block" style={{ color: step >= n ? 'var(--c-text)' : 'var(--c-muted)' }}>{c.steps[n - 1]}</span>
                </div>
                {n < 3 && <div className="w-8 h-px mx-1" style={{ background: step > n ? '#16C47F' : 'var(--c-border)' }} />}
              </div>
            ))}
          </div>

          <div className="rounded-2xl p-8" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>

            {step === 1 && (
              <div className="space-y-4">
                {[
                  { key: 'name', placeholder: c.namePlaceholder },
                  { key: 'owner', placeholder: c.ownerPlaceholder },
                  { key: 'phone', placeholder: c.phonePlaceholder },
                  { key: 'email', placeholder: c.emailPlaceholder },
                ].map(({ key, placeholder }) => (
                  <input key={key} value={form[key]} onChange={e => set(key, e.target.value)} placeholder={placeholder}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                    style={{ background: 'var(--c-input-bg)', border: '1px solid var(--c-input-border)', color: 'var(--c-text)' }} />
                ))}
                <select value={form.industry} onChange={e => set('industry', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{ background: 'var(--c-surface)', border: '1px solid var(--c-input-border)', color: form.industry ? 'var(--c-text)' : 'var(--c-muted)' }}>
                  <option value="">{c.industryLabel}</option>
                  {c.industries.map(i => <option key={i} value={i}>{i}</option>)}
                </select>
                <button onClick={() => canNext1 && setStep(2)} disabled={!canNext1}
                  className="w-full py-3.5 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 mt-4 transition-all hover:brightness-110 disabled:opacity-40"
                  style={{ background: '#16C47F', color: '#05090D' }}>
                  {c.next} <ChevronRight size={16} />
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <p className="text-sm font-medium mb-3" style={{ color: 'var(--c-text)' }}>{c.systemLabel}</p>
                  <div className="space-y-2">
                    {c.systems.map(s => (
                      <button key={s} onClick={() => set('system', s)}
                        className="w-full text-left px-4 py-3 rounded-xl text-sm transition-all"
                        style={{
                          background: form.system === s ? 'rgba(22,196,127,0.1)' : 'var(--c-input-bg)',
                          border: form.system === s ? '1px solid rgba(22,196,127,0.4)' : '1px solid var(--c-border)',
                          color: form.system === s ? '#16C47F' : 'var(--c-text)'
                        }}>{s}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium mb-3" style={{ color: 'var(--c-text)' }}>{c.packageLabel}</p>
                  <div className="space-y-2">
                    {c.packages.map(p => (
                      <button key={p} onClick={() => set('package', p)}
                        className="w-full text-left px-4 py-3 rounded-xl text-sm transition-all"
                        style={{
                          background: form.package === p ? 'rgba(22,196,127,0.1)' : 'var(--c-input-bg)',
                          border: form.package === p ? '1px solid rgba(22,196,127,0.4)' : '1px solid var(--c-border)',
                          color: form.package === p ? '#16C47F' : 'var(--c-text)'
                        }}>{p}</button>
                    ))}
                  </div>
                </div>
                <textarea value={form.notes} onChange={e => set('notes', e.target.value)} placeholder={c.notesPlaceholder} rows={3}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                  style={{ background: 'var(--c-input-bg)', border: '1px solid var(--c-input-border)', color: 'var(--c-text)' }} />
                <div className="flex gap-3">
                  <button onClick={() => setStep(1)}
                    className="flex items-center gap-1 px-5 py-3 rounded-lg text-sm font-medium transition-all"
                    style={{ border: '1px solid var(--c-border)', color: 'var(--c-muted)' }}>
                    <ChevronLeft size={16} /> {c.back}
                  </button>
                  <button onClick={() => canNext2 && setStep(3)} disabled={!canNext2}
                    className="flex-1 py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-all hover:brightness-110 disabled:opacity-40"
                    style={{ background: '#16C47F', color: '#05090D' }}>
                    {c.next} <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h3 className="font-bold text-lg mb-2" style={{ color: 'var(--c-text)' }}>{c.confirmTitle}</h3>
                <p className="text-sm mb-6" style={{ color: 'var(--c-muted)' }}>{c.confirmSub}</p>
                <div className="space-y-3 mb-8">
                  {[
                    [c.namePlaceholder, form.name],
                    [c.ownerPlaceholder, form.owner],
                    [c.phonePlaceholder, form.phone],
                    ['Industry', form.industry],
                    ['System', form.system],
                    ['Package', form.package],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between py-2" style={{ borderBottom: '1px solid var(--c-border-subtle)' }}>
                      <span className="text-xs" style={{ color: 'var(--c-muted)' }}>{k}</span>
                      <span className="text-xs font-medium" style={{ color: 'var(--c-text)' }}>{v}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep(2)}
                    className="flex items-center gap-1 px-5 py-3 rounded-lg text-sm font-medium transition-all"
                    style={{ border: '1px solid var(--c-border)', color: 'var(--c-muted)' }}>
                    <ChevronLeft size={16} /> {c.back}
                  </button>
                  <a href={`https://wa.me/60?text=${encodeURIComponent(msg)}`} target="_blank" rel="noopener noreferrer"
                    className="flex-1 py-3 rounded-lg font-semibold text-sm text-center transition-all hover:brightness-110 flex items-center justify-center"
                    style={{ background: '#16C47F', color: '#05090D' }}>
                    {c.submit}
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

//Pricing.jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, Star, Zap, ArrowRight, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const setupPackages = [
  {
    name: "Mini",
    price: 149,
    desc: "Untuk bisnes yang baru nak mula digitalisasi",
    features: ["1 Jenis Sistem", "Sehingga 20 produk", "Notifikasi WhatsApp", "Setup dalam 48 jam", "2 minggu sokongan"],
    highlight: false,
    cta: "Pilih Mini",
  },
  {
    name: "Starter",
    price: 399,
    desc: "Sesuai untuk bisnes baru yang serius nak berkembang",
    features: ["1 Jenis Sistem", "Sehingga 50 produk", "WhatsApp auto-notifikasi", "Setup & latihan 1 jam", "1 bulan sokongan"],
    highlight: false,
    cta: "Pilih Starter",
  },
  {
    name: "Pro",
    price: 899,
    badge: "Paling Popular",
    desc: "Pilihan terbaik untuk bisnes yang serius dan aktif",
    features: ["2 Jenis Sistem", "Produk tanpa had", "WhatsApp + Email auto", "Panel admin penuh", "Domain .com", "Dashboard analitik", "3 bulan sokongan", "Latihan pasukan"],
    highlight: true,
    cta: "Pilih Pro",
  },
  {
    name: "Business",
    price: 1999,
    desc: "Untuk bisnes besar yang perlukan semua ciri utama",
    features: ["5 Jenis Sistem", "Sokongan berbilang lokasi", "Jenama khas (custom branding)", "Integrasi API", "Pengurusan kakitangan", "Analitik lanjutan", "6 bulan sokongan", "Sokongan keutamaan"],
    highlight: false,
    cta: "Pilih Business",
  },
  {
    name: "Enterprise",
    price: 4999,
    desc: "Untuk rangkaian cawangan, francais atau korporat",
    features: ["Sistem tanpa had", "Platform berbilang klien", "Pembangunan khas", "SLA dijamin", "Sokongan dedikasi", "Latihan di premis", "Pilihan white-label", "1 tahun sokongan"],
    highlight: false,
    cta: "Mulakan Sekarang",
    badge2: "Nilai Terbaik",
  },
  {
    name: "Custom",
    price: null,
    customPrice: "Dari RM5,000",
    desc: "Reka bentuk sendiri — gabungkan mana-mana sistem atau bina dari awal",
    features: ["Reka bentuk sistem unik anda", "Gabung mana-mana sistem", "Pembangunan ciri eksklusif", "Integrasi sistem pihak ketiga", "Sokongan jangka panjang", "Latihan menyeluruh"],
    highlight: false,
    cta: "Dapatkan Quote",
    isCustom: true,
  },
];

const monthlyPlans = [
  {
    name: "Asas",
    monthlyPrice: 89,
    annualDiscount: 10,
    desc: "Penyelenggaraan & hos pelayan asas",
    features: ["Hos & pelayan", "Sandaran harian", "Kemaskini keselamatan", "Sokongan emel"],
    highlight: false,
  },
  {
    name: "Pertumbuhan",
    monthlyPrice: 189,
    annualDiscount: 20,
    badge: "Nilai Terbaik",
    desc: "Untuk bisnes yang aktif berkembang",
    features: ["Semua dalam Asas", "WhatsApp blast 1,000/bulan", "Laporan bulanan", "Sokongan chat", "Kemaskini minor"],
    highlight: true,
  },
  {
    name: "Premium",
    monthlyPrice: 389,
    annualDiscount: 30,
    desc: "Perkhidmatan penuh — fokus bisnes, kami urus sistem",
    features: ["Semua dalam Pertumbuhan", "WhatsApp blast tanpa had", "Kemaskini kandungan", "Sokongan keutamaan", "Panggilan strategi bulanan"],
    highlight: false,
  },
];

const faqs = [
  { q: "Berapa lama masa setup sistem?", a: "Kebanyakan sistem siap dalam 24–48 jam selepas bayaran dan maklumat diterima." },
  { q: "Boleh ubah suai reka bentuk?", a: "Ya, kami boleh ubah warna, logo dan jenama mengikut identiti bisnes anda." },
  { q: "Bagaimana tentang gerbang pembayaran?", a: "Kami menyokong FPX, SenangPay, Billplz dan pindahan manual. Boleh ditambah kemudian." },
  { q: "Jika ada masalah teknikal, bagaimana?", a: "Sokongan melalui WhatsApp mengikut pakej. Balas dalam 24 jam (Pakej keutamaan: 2 jam)." },
  { q: "Boleh naik taraf pakej kemudian?", a: "Ya, boleh naik taraf bila-bila masa. Harga akan dikira secara pro-rata." },
  { q: "Adakah ada caj tersembunyi?", a: "Tiada. Semua kos dinyatakan dengan jelas. Bayar sekali, sistem terus milik anda." },
];

export default function Pricing() {
  const [openFaq, setOpenFaq] = useState(null);
  const [billing, setBilling] = useState("monthly");

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <section className="py-20" style={{ background: "linear-gradient(135deg, #064e3b 0%, #065f46 60%, #047857 100%)" }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="text-emerald-300 text-sm font-semibold uppercase tracking-wider mb-4">Harga Telus, Tiada Kontrak</div>
            <h1 className="text-5xl font-black text-white mb-4">Pelaburan Sekali, Untung Selamanya</h1>
            <p className="text-emerald-100 text-lg max-w-2xl mx-auto">Tiada caj tersembunyi. Bayar sekali, sistem terus jadi milik anda.</p>
          </motion.div>
        </div>
      </section>

      {/* Setup Packages */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-foreground mb-2">Pakej Setup (Bayaran Sekali)</h2>
          <p className="text-muted-foreground">Bayar sekali, sistem terus menjadi milik anda selamanya</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {setupPackages.map((p, i) => (
            <motion.div key={p.name}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className={`relative rounded-2xl p-6 border-2 flex flex-col ${p.highlight ? "border-emerald-500 shadow-xl shadow-emerald-100 dark:shadow-emerald-950 scale-105" : "border-border bg-card"} ${p.isCustom ? "border-purple-400" : ""}`}>
              {p.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
                  <Star className="h-3 w-3 fill-white" />
                  {p.badge}
                </div>
              )}
              {p.badge2 && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full">
                  {p.badge2}
                </div>
              )}
              {p.isCustom && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-purple-600 text-white text-xs font-bold rounded-full flex items-center gap-1">
                  <Zap className="h-3 w-3" />
                  Custom Build
                </div>
              )}
              <div className="mb-4">
                <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">{p.name}</div>
                {p.isCustom ? (
                  <div className="text-3xl font-black text-foreground">{p.customPrice}</div>
                ) : (
                  <div className="flex items-end gap-1">
                    <span className="text-sm text-muted-foreground">RM</span>
                    <span className="text-4xl font-black text-foreground">{p.price.toLocaleString()}</span>
                  </div>
                )}
                <p className="text-xs text-muted-foreground mt-2">{p.desc}</p>
              </div>
              <div className="flex-1 space-y-2.5 mb-6">
                {p.features.map((f) => (
                  <div key={f} className="flex items-start gap-2 text-sm">
                    <CheckCircle className={`h-4 w-4 shrink-0 mt-0.5 ${p.highlight ? "text-emerald-500" : p.isCustom ? "text-purple-500" : "text-muted-foreground"}`} />
                    <span className="text-foreground">{f}</span>
                  </div>
                ))}
              </div>
              <Link to="/setup">
                <Button className={`w-full ${p.highlight ? "bg-emerald-600 hover:bg-emerald-700 text-white" : p.isCustom ? "bg-purple-600 hover:bg-purple-700 text-white" : "bg-secondary hover:bg-border text-foreground"}`}>
                  {p.cta}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Domain Add-on */}
      <section className="py-4 max-w-5xl mx-auto px-4">
        <div className="rounded-2xl border-2 border-dashed border-emerald-300 bg-emerald-50 dark:bg-emerald-950/30 p-6 flex flex-col md:flex-row items-center gap-4 justify-between">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center">
              <Globe className="h-6 w-6 text-emerald-600" />
            </div>
            <div>
              <div className="font-bold text-foreground">Tambahan: Domain .com Sendiri</div>
              <div className="text-sm text-muted-foreground">yourbrand.com — profesional, mudah diingat, tingkatkan kepercayaan pelanggan</div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-black text-emerald-700">RM125<span className="text-base font-normal text-muted-foreground">/tahun</span></div>
            <div className="text-xs text-muted-foreground mt-1">termasuk setup & konfigurasi DNS</div>
          </div>
        </div>
      </section>

      {/* Monthly Support Plans */}
      <section className="py-20 bg-secondary">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-foreground mb-2">Pakej Sokongan Berterusan</h2>
            <p className="text-muted-foreground mb-6">Penyelenggaraan, hos pelayan & sokongan pertumbuhan</p>
            {/* Billing Toggle */}
            <div className="inline-flex items-center gap-1 p-1 bg-background border border-border rounded-xl">
              <button onClick={() => setBilling("monthly")}
                className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${billing === "monthly" ? "bg-emerald-600 text-white shadow" : "text-muted-foreground hover:text-foreground"}`}>
                Bulanan
              </button>
              <button onClick={() => setBilling("annual")}
                className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${billing === "annual" ? "bg-emerald-600 text-white shadow" : "text-muted-foreground hover:text-foreground"}`}>
                Tahunan
                <span className="ml-2 text-xs bg-orange-500 text-white px-1.5 py-0.5 rounded-full">Jimat + Domain Free</span>
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {monthlyPlans.map((p, i) => {
              const annualPrice = Math.round(p.monthlyPrice * (1 - p.annualDiscount / 100));
              const displayPrice = billing === "annual" ? annualPrice : p.monthlyPrice;
              const normalPrice = p.monthlyPrice;

              return (
                <motion.div key={p.name}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className={`relative rounded-2xl p-6 border-2 flex flex-col bg-card ${p.highlight ? "border-emerald-500 shadow-xl" : "border-border"}`}>
                  {p.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full">
                      {p.badge}
                    </div>
                  )}
                  <div className="mb-4">
                    <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">{p.name}</div>
                    <div className="flex items-end gap-1">
                      <span className="text-sm text-muted-foreground">RM</span>
                      <span className="text-4xl font-black text-foreground">{displayPrice}</span>
                      <span className="text-muted-foreground text-sm mb-1">/bulan</span>
                    </div>
                    {billing === "annual" && (
                      <div className="mt-1.5 space-y-0.5">
                        <div className="text-xs text-muted-foreground line-through">Harga biasa: RM{normalPrice}/bln</div>
                        <div className="text-xs text-emerald-600 font-semibold">Jimat {p.annualDiscount}% + 🌐 Domain .com percuma</div>
                      </div>
                    )}
                    <p className="text-xs text-muted-foreground mt-2">{p.desc}</p>
                  </div>
                  <div className="flex-1 space-y-2.5 mb-6">
                    {p.features.map((f) => (
                      <div key={f} className="flex items-start gap-2 text-sm">
                        <CheckCircle className={`h-4 w-4 shrink-0 mt-0.5 ${p.highlight ? "text-emerald-500" : "text-muted-foreground"}`} />
                        <span className="text-foreground">{f}</span>
                      </div>
                    ))}
                    {billing === "annual" && (
                      <div className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 shrink-0 mt-0.5 text-emerald-500" />
                        <span className="text-emerald-600 font-semibold">Domain .com percuma (bernilai RM125)</span>
                      </div>
                    )}
                  </div>
                  <Link to="/setup">
                    <Button className={`w-full ${p.highlight ? "bg-emerald-600 hover:bg-emerald-700 text-white" : "bg-secondary hover:bg-border text-foreground"}`}>
                      Pilih {p.name}
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-black text-foreground mb-10 text-center">Soalan Lazim</h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-border rounded-xl overflow-hidden bg-card">
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full text-left px-5 py-4 font-semibold text-foreground flex justify-between items-center hover:bg-secondary">
                {faq.q}
                <span className="text-muted-foreground text-lg ml-4 shrink-0">{openFaq === i ? "−" : "+"}</span>
              </button>
              {openFaq === i && (
                <div className="px-5 pb-4 text-muted-foreground text-sm leading-relaxed">{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 max-w-3xl mx-auto px-4 text-center">
        <h3 className="text-2xl font-black text-foreground mb-3">Bersedia untuk Mulakan?</h3>
        <p className="text-muted-foreground mb-6">Isi borang pendaftaran, kami akan hubungi anda dalam masa 24 jam.</p>
        <Link to="/setup">
          <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white px-10 h-14">
            Daftar & Mulakan Sekarang
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </section>
    </div>
  );
}

//Home.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../components/LanguageContext';
import { Zap, DollarSign, Smartphone, Shield, Clock, BarChart2, Star, ChevronRight, CheckCircle, ArrowRight } from 'lucide-react';

const testimonials = {
  en: [
    { name: 'Nur Aisyah', role: 'Bakery Owner, Shah Alam', rating: 5, text: 'Before Bratstvo, I was managing 50+ orders via WhatsApp screenshots. Now everything is automatic. I sleep better at night!', avatar: '👩🏻' },
    { name: 'Ahmad Firdaus', role: 'Online Seller, Kuala Lumpur', rating: 5, text: 'Setup was done in ONE day. My customers love the professional order form. Sales increased 40% within the first month.', avatar: '👨🏻' },
    { name: 'Syaza Hazirah', role: 'Salon Owner, Johor Bahru', rating: 5, text: 'No more double-booking. The appointment system is exactly what my salon needed. Super affordable too!', avatar: '👩🏼' },
    { name: 'Razif Kamarudin', role: 'Freelance Designer', rating: 5, text: 'Invoice system is amazing. I can send professional invoices in 30 seconds. My clients think I hired an accountant.', avatar: '👨🏽' },
    { name: 'Priya Krishnan', role: 'F&B Entrepreneur, Penang', rating: 5, text: 'QR ordering transformed our cafe. Customers order from their phones, kitchen gets it instantly. Zero errors!', avatar: '👩🏽' },
    { name: 'Lee Wei Ming', role: 'Gym Owner, PJ', rating: 5, text: 'Managing 200+ members used to be a nightmare. The membership system pays for itself every month.', avatar: '👨🏻' },
  ],
  my: [
    { name: 'Nur Aisyah', role: 'Pemilik Bakeri, Shah Alam', rating: 5, text: 'Sebelum Bratstvo, saya urus 50+ pesanan via tangkapan skrin WhatsApp. Sekarang semuanya automatik. Saya tidur lena sekarang!', avatar: '👩🏻' },
    { name: 'Ahmad Firdaus', role: 'Penjual Dalam Talian, Kuala Lumpur', rating: 5, text: 'Setup siap dalam SATU hari. Pelanggan saya suka borang pesanan profesional. Jualan naik 40% dalam bulan pertama.', avatar: '👨🏻' },
    { name: 'Syaza Hazirah', role: 'Pemilik Salun, Johor Bahru', rating: 5, text: 'Tiada lagi tempahan berganda. Sistem temujanji adalah tepat apa yang salun saya perlukan. Sangat mampu milik!', avatar: '👩🏼' },
    { name: 'Razif Kamarudin', role: 'Pereka Bebas', rating: 5, text: 'Sistem invois sangat hebat. Saya boleh hantar invois profesional dalam 30 saat. Pelanggan saya fikir saya ambil akauntan.', avatar: '👨🏽' },
    { name: 'Priya Krishnan', role: 'Usahawan F&B, Penang', rating: 5, text: 'Pesanan QR mengubah kafe kami. Pelanggan pesan dari telefon, dapur terima serta-merta. Sifar kesilapan!', avatar: '👩🏽' },
    { name: 'Lee Wei Ming', role: 'Pemilik Gim, PJ', rating: 5, text: 'Mengurus 200+ ahli dulu mimpi ngeri. Sistem keahlian mampu bayar dirinya sendiri setiap bulan.', avatar: '👨🏻' },
  ]
};

const featuredSystems = {
  en: [
    { emoji: '🍱', name: 'Food Preorder', from: 149, color: '#FF6B35', tag: 'Most Popular' },
    { emoji: '📅', name: 'Booking System', from: 149, color: '#0EA5E9', tag: 'Fast Setup' },
    { emoji: '🏪', name: 'eCommerce Store', from: 590, color: '#16C47F', tag: 'Full Featured' },
    { emoji: '📊', name: 'CRM System', from: 590, color: '#6366F1', tag: 'Scale Fast' },
    { emoji: '🧾', name: 'Invoice System', from: 149, color: '#EC4899', tag: 'Save Hours' },
    { emoji: '👑', name: 'Membership', from: 590, color: '#F59E0B', tag: 'Recurring Revenue' },
  ],
  my: [
    { emoji: '🍱', name: 'Pra-Pesanan Makanan', from: 149, color: '#FF6B35', tag: 'Paling Popular' },
    { emoji: '📅', name: 'Sistem Tempahan', from: 149, color: '#0EA5E9', tag: 'Setup Pantas' },
    { emoji: '🏪', name: 'Kedai eCommerce', from: 590, color: '#16C47F', tag: 'Ciri Penuh' },
    { emoji: '📊', name: 'Sistem CRM', from: 590, color: '#6366F1', tag: 'Kembang Pantas' },
    { emoji: '🧾', name: 'Sistem Invois', from: 149, color: '#EC4899', tag: 'Jimat Masa' },
    { emoji: '👑', name: 'Keahlian', from: 590, color: '#F59E0B', tag: 'Pendapatan Berulang' },
  ]
};

const content = {
  en: {
    heroBadge: '10 Systems · Delivered in 24hrs · Starting RM149',
    heroTitle: ['Your Business.', 'Fully Automated.'],
    heroSub: 'Bratstvo Digital builds professional digital systems for Malaysian SMEs — preorder systems, booking platforms, eCommerce stores, CRMs, and more. Setup in 24 hours.',
    heroCta1: 'See All Systems', heroCta2: 'Try Live Demo',
    statsTitle: 'Trusted by businesses across Malaysia',
    stats: [{ value: '50+', label: 'Systems Delivered' }, { value: '24hrs', label: 'Avg. Setup Time' }, { value: '98%', label: 'Client Satisfaction' }, { value: 'RM149', label: 'Starts From' }],
    whatTitle: 'What Is Bratstvo Digital?',
    whatSub: 'We are a digital automation agency that builds ready-to-use business systems for Malaysian SMEs. No coding. No technical knowledge needed.',
    what: [
      { icon: '🏗️', title: 'We Build It For You', desc: 'Tell us your business — we design, build, and deploy your entire digital system within 24 hours.' },
      { icon: '🤖', title: '100% Automated', desc: 'Your system runs 24/7 without you lifting a finger. Orders, bookings, invoices — all automatic.' },
      { icon: '📱', title: 'WhatsApp Native', desc: 'Every system is designed around WhatsApp — the platform your customers already use every day.' },
      { icon: '💰', title: 'Affordable & Local', desc: 'Starting from just RM149. Built by a Malaysian team who understands your business challenges.' },
    ],
    howTitle: 'How It Works',
    howSub: 'From sign-up to live system in 3 simple steps',
    steps: [
      { n: '1', title: 'Choose Your System', desc: 'Browse our 10 ready-made systems. Pick the one that fits your business. Or tell us your idea.' },
      { n: '2', title: 'Submit Setup Form', desc: 'Fill in your business details, branding, and preferences. Takes 5 minutes.' },
      { n: '3', title: 'Go Live in 24hrs', desc: 'We build and deploy your complete system. You get a shareable link to send customers.' },
    ],
    featuredTitle: 'Popular Systems',
    featuredSub: 'The most requested systems by Malaysian businesses',
    fromLabel: 'From',
    setupLabel: 'one-time',
    seeAll: 'See All 10 Systems →',
    whyTitle: 'Why Businesses Choose Us',
    why: [
      { icon: Zap, title: 'Live in 24 Hours', desc: 'Not weeks. Not months. Your system is ready to use the very next day.' },
      { icon: DollarSign, title: 'Transparent Pricing', desc: 'No hidden fees. Fixed one-time setup cost. Optional monthly care plans.' },
      { icon: Smartphone, title: 'Mobile First', desc: 'Every system is designed to work perfectly on mobile — for you and your customers.' },
      { icon: Shield, title: 'Secure & Reliable', desc: 'Your data is safe. Systems run on enterprise-grade cloud infrastructure.' },
      { icon: Clock, title: '24/7 Automation', desc: 'Your system works while you sleep. Accept orders, bookings, and payments anytime.' },
      { icon: BarChart2, title: 'Real Analytics', desc: 'See exactly how your business is performing. Sales reports, customer data, trends.' },
    ],
    demoTitle: 'See It In Action',
    demoSub: 'Try our interactive demo — the actual experience your customers will have',
    demoCta: 'Try Live Demo →',
    pricingTitle: 'Simple Pricing',
    pricingSub: 'One-time setup. No monthly surprises.',
    pricing: [
      { name: 'Starter', price: 149, desc: 'Perfect for testing', features: ['1 automation system', 'WhatsApp integration', '14-day support'] },
      { name: 'Growth', price: 590, desc: 'For serious businesses', features: ['1 system + Sheets storage', 'Customer database', '30-day support'], popular: true },
      { name: 'Professional', price: 1490, desc: 'Full features', features: ['Advanced system', 'Cloud database + dashboard', '60-day support'] },
    ],
    viewFull: 'View Full Pricing →',
    testimonialTitle: 'What Our Clients Say',
    testimonialSub: 'Real businesses. Real results.',
    ctaTitle: 'Ready to Automate Your Business?',
    ctaSub: 'Join 50+ Malaysian businesses already running on Bratstvo systems. Setup in 24 hours.',
    ctaBtn1: 'Start Your System', ctaBtn2: 'Talk to Us',
  },
  my: {
    heroBadge: '10 Sistem · Siap dalam 24jam · Bermula RM149',
    heroTitle: ['Perniagaan Anda.', 'Sepenuhnya Automatik.'],
    heroSub: 'Bratstvo Digital bina sistem digital profesional untuk PKS Malaysia — sistem pra-pesanan, platform tempahan, kedai eCommerce, CRM, dan lagi. Setup dalam 24 jam.',
    heroCta1: 'Lihat Semua Sistem', heroCta2: 'Cuba Demo Langsung',
    statsTitle: 'Dipercayai perniagaan di seluruh Malaysia',
    stats: [{ value: '50+', label: 'Sistem Dihantar' }, { value: '24jam', label: 'Purata Masa Setup' }, { value: '98%', label: 'Kepuasan Pelanggan' }, { value: 'RM149', label: 'Bermula Dari' }],
    whatTitle: 'Apa Itu Bratstvo Digital?',
    whatSub: 'Kami adalah agensi automasi digital yang membina sistem perniagaan sedia guna untuk PKS Malaysia. Tiada pengekodan. Tiada pengetahuan teknikal diperlukan.',
    what: [
      { icon: '🏗️', title: 'Kami Bina Untuk Anda', desc: 'Beritahu kami perniagaan anda — kami reka, bina, dan lancarkan keseluruhan sistem digital anda dalam 24 jam.' },
      { icon: '🤖', title: '100% Automatik', desc: 'Sistem anda berjalan 24/7 tanpa anda perlu buat apa-apa. Pesanan, tempahan, invois — semuanya automatik.' },
      { icon: '📱', title: 'Asli WhatsApp', desc: 'Setiap sistem direka berdasarkan WhatsApp — platform yang pelanggan anda sudah guna setiap hari.' },
      { icon: '💰', title: 'Mampu Milik & Tempatan', desc: 'Bermula dari RM149 sahaja. Dibina oleh pasukan Malaysia yang faham cabaran perniagaan anda.' },
    ],
    howTitle: 'Cara Ia Berfungsi',
    howSub: 'Dari daftar hingga sistem langsung dalam 3 langkah mudah',
    steps: [
      { n: '1', title: 'Pilih Sistem Anda', desc: 'Semak 10 sistem sedia guna kami. Pilih yang sesuai dengan perniagaan anda. Atau beritahu idea anda.' },
      { n: '2', title: 'Hantar Borang Setup', desc: 'Isi butiran perniagaan, penjenamaan, dan keutamaan anda. Ambil masa 5 minit.' },
      { n: '3', title: 'Aktif dalam 24jam', desc: 'Kami bina dan lancarkan sistem lengkap anda. Anda dapat pautan yang boleh dikongsi dengan pelanggan.' },
    ],
    featuredTitle: 'Sistem Popular',
    featuredSub: 'Sistem yang paling banyak diminta oleh perniagaan Malaysia',
    fromLabel: 'Dari',
    setupLabel: 'sekali bayar',
    seeAll: 'Lihat Semua 10 Sistem →',
    whyTitle: 'Kenapa Perniagaan Pilih Kami',
    why: [
      { icon: Zap, title: 'Aktif dalam 24 Jam', desc: 'Bukan minggu. Bukan bulan. Sistem anda sedia digunakan hari berikutnya.' },
      { icon: DollarSign, title: 'Harga Telus', desc: 'Tiada caj tersembunyi. Kos setup tetap sekali sahaja. Pelan penjagaan bulanan pilihan.' },
      { icon: Smartphone, title: 'Utamakan Mudah Alih', desc: 'Setiap sistem direka untuk berfungsi sempurna di mudah alih — untuk anda dan pelanggan anda.' },
      { icon: Shield, title: 'Selamat & Boleh Dipercayai', desc: 'Data anda selamat. Sistem berjalan pada infrastruktur awan gred perusahaan.' },
      { icon: Clock, title: 'Automasi 24/7', desc: 'Sistem anda bekerja semasa anda tidur. Terima pesanan, tempahan, dan bayaran bila-bila masa.' },
      { icon: BarChart2, title: 'Analitik Sebenar', desc: 'Lihat dengan tepat prestasi perniagaan anda. Laporan jualan, data pelanggan, trend.' },
    ],
    demoTitle: 'Lihat Ia Beraksi',
    demoSub: 'Cuba demo interaktif kami — pengalaman sebenar yang pelanggan anda akan alami',
    demoCta: 'Cuba Demo Langsung →',
    pricingTitle: 'Harga Mudah',
    pricingSub: 'Setup sekali sahaja. Tiada kejutan bulanan.',
    pricing: [
      { name: 'Starter', price: 149, desc: 'Sempurna untuk mencuba', features: ['1 sistem automasi', 'Integrasi WhatsApp', 'Sokongan 14 hari'] },
      { name: 'Growth', price: 590, desc: 'Untuk perniagaan serius', features: ['1 sistem + storan Sheets', 'Pangkalan data pelanggan', 'Sokongan 30 hari'], popular: true },
      { name: 'Professional', price: 1490, desc: 'Ciri penuh', features: ['Sistem lanjutan', 'Pangkalan data awan + papan pemuka', 'Sokongan 60 hari'] },
    ],
    viewFull: 'Lihat Harga Penuh →',
    testimonialTitle: 'Kata Pelanggan Kami',
    testimonialSub: 'Perniagaan sebenar. Hasil sebenar.',
    ctaTitle: 'Bersedia Automasikan Perniagaan Anda?',
    ctaSub: 'Sertai 50+ perniagaan Malaysia yang sudah menggunakan sistem Bratstvo. Setup dalam 24 jam.',
    ctaBtn1: 'Mulakan Sistem Anda', ctaBtn2: 'Hubungi Kami',
  }
};

export default function Home() {
  const { lang } = useLang();
  const c = content[lang];
  const featured = featuredSystems[lang];
  const testi = testimonials[lang];

  return (
    <div style={{ background: 'var(--c-bg)' }}>

      {/* ── HERO ── */}
      <section className="relative min-h-[90vh] flex items-center px-6 py-28" style={{ background: 'var(--c-bg)' }}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 left-1/3 w-[600px] h-[600px] rounded-full opacity-5"
            style={{ background: 'radial-gradient(circle, #16C47F, transparent 70%)' }} />
          <div className="absolute top-20 right-10 w-2 h-2 rounded-full animate-pulse" style={{ background: '#16C47F' }} />
          <div className="absolute bottom-40 left-10 w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#16C47F', animationDelay: '1s' }} />
        </div>
        <div className="max-w-6xl mx-auto w-full">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-8"
              style={{ background: 'rgba(22,196,127,0.1)', border: '1px solid rgba(22,196,127,0.3)', color: '#16C47F' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              {c.heroBadge}
            </div>
            <h1 className="text-5xl md:text-7xl font-black leading-[1.05] mb-6" style={{ color: 'var(--c-text)' }}>
              {c.heroTitle[0]}<br />
              <span style={{ color: '#16C47F' }}>{c.heroTitle[1]}</span>
            </h1>
            <p className="text-lg leading-relaxed mb-10 max-w-xl" style={{ color: 'var(--c-muted)' }}>{c.heroSub}</p>
            <div className="flex flex-wrap gap-4">
              <Link to="/Systems"
                className="px-8 py-4 rounded-xl font-bold text-sm flex items-center gap-2 transition-all hover:brightness-110"
                style={{ background: '#16C47F', color: '#05090D' }}>
                {c.heroCta1} <ArrowRight size={16} />
              </Link>
              <Link to="/Demo"
                className="px-8 py-4 rounded-xl font-bold text-sm flex items-center gap-2 transition-all"
                style={{ border: '1px solid var(--c-border)', color: 'var(--c-text)' }}>
                {c.heroCta2} →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ background: 'var(--c-surface)', borderTop: '1px solid var(--c-border)', borderBottom: '1px solid var(--c-border)' }}>
        <div className="max-w-6xl mx-auto px-6 py-10">
          <p className="text-xs text-center mb-8 font-medium uppercase tracking-widest" style={{ color: 'var(--c-muted)' }}>{c.statsTitle}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {c.stats.map((s, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl font-black mb-1" style={{ color: '#16C47F' }}>{s.value}</p>
                <p className="text-xs" style={{ color: 'var(--c-muted)' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT WE DO ── */}
      <section className="py-20 px-6" style={{ background: 'var(--c-bg)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black mb-4" style={{ color: 'var(--c-text)' }}>{c.whatTitle}</h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: 'var(--c-muted)' }}>{c.whatSub}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {c.what.map((w, i) => (
              <div key={i} className="rounded-2xl p-7 flex gap-5 transition-all hover:-translate-y-0.5 duration-300"
                style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border-subtle)' }}>
                <div className="text-3xl shrink-0">{w.icon}</div>
                <div>
                  <h3 className="font-bold mb-2" style={{ color: 'var(--c-text)' }}>{w.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--c-muted)' }}>{w.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-20 px-6" style={{ background: 'var(--c-surface)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#16C47F' }}>Process</p>
            <h2 className="text-3xl md:text-4xl font-black mb-3" style={{ color: 'var(--c-text)' }}>{c.howTitle}</h2>
            <p className="text-base" style={{ color: 'var(--c-muted)' }}>{c.howSub}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {c.steps.map((s, i) => (
              <div key={i} className="rounded-2xl p-8 relative" style={{ background: 'var(--c-bg)', border: '1px solid var(--c-border-subtle)' }}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg mb-6"
                  style={{ background: '#16C47F', color: '#05090D' }}>{s.n}</div>
                {i < 2 && (
                  <div className="hidden md:block absolute top-12 -right-3 z-10">
                    <ChevronRight size={20} style={{ color: '#16C47F' }} />
                  </div>
                )}
                <h3 className="font-black text-base mb-3" style={{ color: 'var(--c-text)' }}>{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--c-muted)' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED SYSTEMS ── */}
      <section className="py-20 px-6" style={{ background: 'var(--c-bg)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#16C47F' }}>Systems</p>
            <h2 className="text-3xl md:text-4xl font-black mb-3" style={{ color: 'var(--c-text)' }}>{c.featuredTitle}</h2>
            <p className="text-base" style={{ color: 'var(--c-muted)' }}>{c.featuredSub}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {featured.map((sys, i) => (
              <Link key={i} to="/Systems"
                className="rounded-2xl p-5 flex flex-col transition-all hover:-translate-y-1 duration-300"
                style={{ background: 'var(--c-surface)', border: `1px solid ${sys.color}25` }}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">{sys.emoji}</span>
                  <span className="text-xs px-2 py-1 rounded-lg font-semibold"
                    style={{ background: `${sys.color}15`, color: sys.color }}>{sys.tag}</span>
                </div>
                <p className="font-bold text-sm mb-1" style={{ color: 'var(--c-text)' }}>{sys.name}</p>
                <p className="text-xs" style={{ color: 'var(--c-muted)' }}>{c.fromLabel} RM{sys.from} {c.setupLabel}</p>
              </Link>
            ))}
          </div>
          <div className="text-center">
            <Link to="/Systems" className="inline-flex items-center gap-2 text-sm font-bold transition-all hover:brightness-110"
              style={{ color: '#16C47F' }}>{c.seeAll}</Link>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="py-20 px-6" style={{ background: 'var(--c-surface)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#16C47F' }}>Why Us</p>
            <h2 className="text-3xl md:text-4xl font-black" style={{ color: 'var(--c-text)' }}>{c.whyTitle}</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {c.why.map((w, i) => {
              const Icon = w.icon;
              return (
                <div key={i} className="rounded-2xl p-6 transition-all hover:-translate-y-0.5 duration-300"
                  style={{ background: 'var(--c-bg)', border: '1px solid var(--c-border-subtle)' }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: 'rgba(22,196,127,0.1)' }}>
                    <Icon size={20} style={{ color: '#16C47F' }} />
                  </div>
                  <h3 className="font-bold text-sm mb-2" style={{ color: 'var(--c-text)' }}>{w.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--c-muted)' }}>{w.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── DEMO PREVIEW ── */}
      <section className="py-20 px-6" style={{ background: 'var(--c-bg)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="rounded-3xl overflow-hidden" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
            <div className="grid md:grid-cols-2">
              <div className="p-10 flex flex-col justify-center">
                <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#16C47F' }}>Demo</p>
                <h2 className="text-3xl font-black mb-4" style={{ color: 'var(--c-text)' }}>{c.demoTitle}</h2>
                <p className="text-sm leading-relaxed mb-8" style={{ color: 'var(--c-muted)' }}>{c.demoSub}</p>
                <Link to="/Demo" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all hover:brightness-110 self-start"
                  style={{ background: '#16C47F', color: '#05090D' }}>
                  {c.demoCta}
                </Link>
              </div>
              <div className="p-6" style={{ background: '#075E54' }}>
                <div className="rounded-xl overflow-hidden">
                  <div className="px-4 py-3 flex items-center gap-2" style={{ background: '#128C7E' }}>
                    <div className="w-8 h-8 rounded-full font-bold text-xs flex items-center justify-center" style={{ background: '#16C47F', color: '#05090D' }}>BD</div>
                    <div>
                      <p className="text-sm font-bold text-white">Mak Teh Catering</p>
                      <p className="text-xs" style={{ color: '#8FD6C2' }}>Online · Automated System</p>
                    </div>
                  </div>
                  <div className="p-4 space-y-2">
                    {['🍱 Nasi Lemak Set A — RM8.50', '🍜 Mee Goreng — RM7.00', '🫓 Roti Canai Set — RM5.50'].map((msg, i) => (
                      <div key={i} className="rounded-xl p-3 max-w-[85%] text-xs leading-relaxed"
                        style={{ background: '#dcf8c6', color: '#1a1a1a' }}>{msg}</div>
                    ))}
                    <div className="rounded-xl p-3 max-w-[85%] text-xs font-semibold"
                      style={{ background: '#dcf8c6', color: '#1a1a1a' }}>
                      ✅ Order confirmed! Your total is RM21.00. Payment to Maybank: 1234567890
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING PREVIEW ── */}
      <section className="py-20 px-6" style={{ background: 'var(--c-surface)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#16C47F' }}>Pricing</p>
            <h2 className="text-3xl md:text-4xl font-black mb-3" style={{ color: 'var(--c-text)' }}>{c.pricingTitle}</h2>
            <p className="text-base" style={{ color: 'var(--c-muted)' }}>{c.pricingSub}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            {c.pricing.map((plan, i) => (
              <div key={i} className="rounded-2xl p-7 flex flex-col transition-all hover:-translate-y-1 duration-300"
                style={{
                  background: plan.popular ? 'rgba(22,196,127,0.06)' : 'var(--c-bg)',
                  border: plan.popular ? '2px solid rgba(22,196,127,0.4)' : '1px solid var(--c-border-subtle)',
                }}>
                {plan.popular && (
                  <span className="text-xs font-bold px-3 py-1 rounded-full self-start mb-3"
                    style={{ background: '#16C47F', color: '#05090D' }}>Most Popular</span>
                )}
                <h3 className="font-black mb-1" style={{ color: 'var(--c-text)' }}>{plan.name}</h3>
                <p className="text-xs mb-4" style={{ color: 'var(--c-muted)' }}>{plan.desc}</p>
                <div className="text-3xl font-black mb-5" style={{ color: plan.popular ? '#16C47F' : 'var(--c-text)' }}>RM{plan.price}</div>
                <ul className="space-y-2 flex-1 mb-6">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm" style={{ color: 'var(--c-muted)' }}>
                      <CheckCircle size={13} style={{ color: '#16C47F' }} /> {f}
                    </li>
                  ))}
                </ul>
                <Link to="/Pricing" className="text-center py-2.5 rounded-xl font-bold text-sm transition-all hover:brightness-110"
                  style={{ background: plan.popular ? '#16C47F' : 'transparent', color: plan.popular ? '#05090D' : 'var(--c-text)', border: plan.popular ? 'none' : '1px solid var(--c-border)' }}>
                  Get Started
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link to="/Pricing" className="text-sm font-bold" style={{ color: '#16C47F' }}>{c.viewFull}</Link>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-20 px-6" style={{ background: 'var(--c-bg)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#16C47F' }}>Reviews</p>
            <h2 className="text-3xl md:text-4xl font-black mb-3" style={{ color: 'var(--c-text)' }}>{c.testimonialTitle}</h2>
            <p className="text-base" style={{ color: 'var(--c-muted)' }}>{c.testimonialSub}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {testi.map((t, i) => (
              <div key={i} className="rounded-2xl p-7 flex flex-col gap-4 transition-all hover:-translate-y-0.5 duration-300"
                style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border-subtle)' }}>
                <div className="flex gap-0.5">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} size={14} fill="#F59E0B" style={{ color: '#F59E0B' }} />
                  ))}
                </div>
                <p className="text-sm leading-relaxed flex-1 italic" style={{ color: 'var(--c-muted)' }}>"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{t.avatar}</span>
                  <div>
                    <p className="text-sm font-bold" style={{ color: 'var(--c-text)' }}>{t.name}</p>
                    <p className="text-xs" style={{ color: 'var(--c-muted)' }}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-24 px-6" style={{ background: 'var(--c-surface)' }}>
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-8"
            style={{ background: 'rgba(22,196,127,0.1)', border: '1px solid rgba(22,196,127,0.3)', color: '#16C47F' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            {lang === 'en' ? 'Starts from RM149 · Live in 24 hours' : 'Bermula dari RM149 · Aktif dalam 24 jam'}
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-6" style={{ color: 'var(--c-text)' }}>{c.ctaTitle}</h2>
          <p className="text-base mb-10" style={{ color: 'var(--c-muted)' }}>{c.ctaSub}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/Setup" className="px-10 py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all hover:brightness-110"
              style={{ background: '#16C47F', color: '#05090D' }}>
              {c.ctaBtn1} <ArrowRight size={16} />
            </Link>
            <a href="https://wa.me/60?text=Hi Bratstvo Digital! I want to learn more."
              target="_blank" rel="noopener noreferrer"
              className="px-10 py-4 rounded-xl font-bold text-sm flex items-center justify-center transition-all"
              style={{ border: '1px solid var(--c-border)', color: 'var(--c-text)' }}>
              {c.ctaBtn2} →
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

//Demo.jsx
import { useState } from 'react';
import { useLang } from '../components/LanguageContext';
import { ShoppingCart, Star, Clock, MapPin, ChevronRight, CheckCircle, Phone, Calendar, Users, BarChart2, TrendingUp, Package } from 'lucide-react';

// ─── Food Demo (looks like actual preorder app) ───
function FoodDemo({ lang }) {
  const [cart, setCart] = useState({});
  const [step, setStep] = useState('menu'); // menu | form | confirm
  const [form, setForm] = useState({ nama: '', whatsapp: '', masa: '' });
  const [submitted, setSubmitted] = useState(false);

  const menu = [
    { id: 0, name: 'Nasi Lemak Set A', price: 8.50, emoji: '🍛', desc: 'Sambal tumis, telur, ikan bilis, kacang', sold: 42 },
    { id: 1, name: 'Mee Goreng Mamak', price: 7.00, emoji: '🍜', desc: 'Pedas sederhana, dengan telur & sayur', sold: 28 },
    { id: 2, name: 'Roti Canai + Teh Tarik', price: 5.50, emoji: '🫓', desc: 'Roti canai rangup dengan kari dal', sold: 65 },
    { id: 3, name: 'Nasi Goreng Kampung', price: 9.00, emoji: '🍚', desc: 'Dengan ayam, telur mata dan keropok', sold: 19 },
  ];

  const add = (id) => setCart(p => ({ ...p, [id]: (p[id] || 0) + 1 }));
  const remove = (id) => setCart(p => { const n = { ...p }; if (n[id] > 1) n[id]--; else delete n[id]; return n; });
  const total = Object.entries(cart).reduce((s, [id, q]) => s + menu[id].price * q, 0);
  const count = Object.values(cart).reduce((s, q) => s + q, 0);

  const timeSlots = ['9:00 PG', '10:00 PG', '11:00 PG', '12:00 TGH', '1:00 PTG', '2:00 PTG'];

  if (submitted) return (
    <div className="flex flex-col items-center justify-center h-full py-8 text-center">
      <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ background: 'rgba(22,196,127,0.15)' }}>
        <CheckCircle size={32} style={{ color: '#16C47F' }} />
      </div>
      <p className="font-black text-lg mb-1 text-white">Pesanan Disahkan!</p>
      <p className="text-sm text-green-200 mb-1">{form.nama} · {form.masa}</p>
      <p className="text-xs text-green-300 mb-4">Resit dihantar ke WhatsApp {form.whatsapp}</p>
      <div className="rounded-xl p-3 text-left text-xs" style={{ background: 'rgba(255,255,255,0.1)', color: '#dcf8c6' }}>
        <p className="font-bold mb-1">📋 Ringkasan Pesanan</p>
        {Object.entries(cart).map(([id, q]) => <p key={id}>• {menu[id].name} × {q}</p>)}
        <p className="font-bold mt-1">Jumlah: RM{total.toFixed(2)}</p>
      </div>
      <button onClick={() => { setSubmitted(false); setCart({}); setStep('menu'); setForm({ nama: '', whatsapp: '', masa: '' }); }}
        className="mt-4 px-5 py-2 rounded-xl text-sm font-bold" style={{ background: '#16C47F', color: '#05090D' }}>
        {lang === 'en' ? 'New Order' : 'Pesanan Baru'}
      </button>
    </div>
  );

  return (
    <div className="h-full flex flex-col">
      {/* App Header */}
      <div className="px-4 py-3" style={{ background: '#FF6B35' }}>
        <div className="flex items-center gap-3">
          <span className="text-2xl">🍱</span>
          <div>
            <p className="font-black text-white text-sm">Katering Mak Teh</p>
            <div className="flex items-center gap-2">
              <Star size={10} fill="gold" color="gold" />
              <span className="text-xs text-white/80">4.9 · 127 ulasan · Petaling Jaya</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 mt-2 text-xs text-white/80">
          <span className="flex items-center gap-1"><Clock size={10} /> Tutup 3:00 PTG</span>
          <span>·</span>
          <span className="flex items-center gap-1"><MapPin size={10} /> 2.3km</span>
        </div>
      </div>

      {/* Step: Menu */}
      {step === 'menu' && (
        <>
          <div className="flex-1 overflow-y-auto">
            <div className="px-4 py-2 text-xs font-bold uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.5)' }}>Menu Hari Ini</div>
            <div className="space-y-2 px-3 pb-3">
              {menu.map(item => (
                <div key={item.id} className="rounded-xl p-3 flex gap-3" style={{ background: 'rgba(255,255,255,0.08)' }}>
                  <span className="text-3xl">{item.emoji}</span>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-white">{item.name}</p>
                    <p className="text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>{item.desc}</p>
                    <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>{item.sold} terjual hari ini</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-black" style={{ color: '#16C47F' }}>RM{item.price.toFixed(2)}</span>
                      {cart[item.id] ? (
                        <div className="flex items-center gap-2">
                          <button onClick={() => remove(item.id)} className="w-6 h-6 rounded-full text-xs font-black flex items-center justify-center" style={{ background: 'rgba(239,68,68,0.3)', color: '#ff6b6b' }}>−</button>
                          <span className="text-white font-bold text-sm">{cart[item.id]}</span>
                          <button onClick={() => add(item.id)} className="w-6 h-6 rounded-full text-xs font-black flex items-center justify-center" style={{ background: '#16C47F', color: '#05090D' }}>+</button>
                        </div>
                      ) : (
                        <button onClick={() => add(item.id)} className="px-3 py-1 rounded-lg text-xs font-bold" style={{ background: '#16C47F', color: '#05090D' }}>Tambah</button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {count > 0 && (
            <div className="p-3">
              <button onClick={() => setStep('form')} className="w-full py-3 rounded-xl font-black text-sm flex items-center justify-between px-4" style={{ background: '#16C47F', color: '#05090D' }}>
                <span><ShoppingCart size={14} className="inline mr-2" />{count} item</span>
                <span>RM{total.toFixed(2)} → Teruskan</span>
              </button>
            </div>
          )}
        </>
      )}

      {/* Step: Form */}
      {step === 'form' && (
        <div className="flex-1 p-4 space-y-3">
          <p className="font-bold text-white text-sm">Maklumat Pesanan</p>
          {[{ key: 'nama', label: 'Nama Anda', placeholder: 'cth: Ahmad' }, { key: 'whatsapp', label: 'No. WhatsApp', placeholder: '012-3456789' }].map(({ key, label, placeholder }) => (
            <div key={key}>
              <label className="text-xs mb-1 block" style={{ color: 'rgba(255,255,255,0.6)' }}>{label}</label>
              <input value={form[key]} onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))} placeholder={placeholder}
                className="w-full px-3 py-2.5 rounded-xl text-sm text-white outline-none"
                style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }} />
            </div>
          ))}
          <div>
            <label className="text-xs mb-2 block" style={{ color: 'rgba(255,255,255,0.6)' }}>Masa Ambil</label>
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map(t => (
                <button key={t} onClick={() => setForm(p => ({ ...p, masa: t }))}
                  className="py-2 rounded-lg text-xs font-medium"
                  style={{ background: form.masa === t ? '#16C47F' : 'rgba(255,255,255,0.1)', color: form.masa === t ? '#05090D' : 'white' }}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="rounded-xl p-3" style={{ background: 'rgba(22,196,127,0.15)' }}>
            {Object.entries(cart).map(([id, q]) => (
              <div key={id} className="flex justify-between text-xs text-white">
                <span>{menu[id].name} × {q}</span><span>RM{(menu[id].price * q).toFixed(2)}</span>
              </div>
            ))}
            <div className="flex justify-between text-sm font-black text-white mt-2 pt-2" style={{ borderTop: '1px solid rgba(255,255,255,0.2)' }}>
              <span>Jumlah</span><span style={{ color: '#16C47F' }}>RM{total.toFixed(2)}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setStep('menu')} className="px-4 py-2.5 rounded-xl text-sm" style={{ border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.6)' }}>← Kembali</button>
            <button onClick={() => { if (form.nama && form.whatsapp && form.masa) setSubmitted(true); }}
              disabled={!form.nama || !form.whatsapp || !form.masa}
              className="flex-1 py-2.5 rounded-xl font-bold text-sm disabled:opacity-40"
              style={{ background: '#16C47F', color: '#05090D' }}>
              Hantar Pesanan
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Booking Demo (looks like actual salon booking app) ───
function BookingDemo({ lang }) {
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [form, setForm] = useState({ nama: '', telefon: '' });
  const [confirmed, setConfirmed] = useState(false);

  const services = [
    { id: 0, name: 'Potong + Cuci Rambut', price: 65, duration: '45 min', emoji: '✂️', slots: 5 },
    { id: 1, name: 'Warna Rambut (Penuh)', price: 220, duration: '3 jam', emoji: '🎨', slots: 2 },
    { id: 2, name: 'Rawatan Head Spa', price: 150, duration: '90 min', emoji: '💆', slots: 3 },
    { id: 3, name: 'Kuku Seni Fullset', price: 95, duration: '2 jam', emoji: '💅', slots: 4 },
  ];

  const dates = [
    { label: 'Isnin', date: '7 Apr', full: '7 April 2026' },
    { label: 'Selasa', date: '8 Apr', full: '8 April 2026' },
    { label: 'Rabu', date: '9 Apr', full: '9 April 2026' },
    { label: 'Khamis', date: '10 Apr', full: '10 April 2026' },
  ];

  const times = ['9:00 PG', '10:30 PG', '12:00 TGH', '2:00 PTG', '3:30 PTG', '5:00 PTG'];
  const bookedTimes = ['10:30 PG', '2:00 PTG'];

  if (confirmed) return (
    <div className="flex flex-col items-center justify-center h-full py-8 text-center px-4">
      <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ background: 'rgba(14,165,233,0.2)' }}>
        <CheckCircle size={32} style={{ color: '#0EA5E9' }} />
      </div>
      <p className="font-black text-white text-base mb-1">Tempahan Disahkan!</p>
      <p className="text-sm text-blue-200 mb-3">{services[selectedService]?.name}</p>
      <div className="rounded-xl p-3 text-xs text-left w-full" style={{ background: 'rgba(255,255,255,0.1)' }}>
        <div className="flex justify-between text-white py-1"><span style={{ color: 'rgba(255,255,255,0.6)' }}>Nama</span><span>{form.nama}</span></div>
        <div className="flex justify-between text-white py-1"><span style={{ color: 'rgba(255,255,255,0.6)' }}>Perkhidmatan</span><span>{services[selectedService]?.name}</span></div>
        <div className="flex justify-between text-white py-1"><span style={{ color: 'rgba(255,255,255,0.6)' }}>Tarikh</span><span>{dates[selectedDate]?.full}</span></div>
        <div className="flex justify-between text-white py-1"><span style={{ color: 'rgba(255,255,255,0.6)' }}>Masa</span><span>{selectedTime}</span></div>
        <div className="flex justify-between text-white py-1 font-bold"><span style={{ color: 'rgba(255,255,255,0.6)' }}>Harga</span><span style={{ color: '#0EA5E9' }}>RM{services[selectedService]?.price}</span></div>
      </div>
      <p className="text-xs mt-3" style={{ color: 'rgba(255,255,255,0.5)' }}>Peringatan akan dihantar ke {form.telefon}</p>
      <button onClick={() => { setConfirmed(false); setSelectedService(null); setSelectedDate(null); setSelectedTime(null); setForm({ nama: '', telefon: '' }); }}
        className="mt-4 px-5 py-2 rounded-xl text-sm font-bold" style={{ background: '#0EA5E9', color: 'white' }}>
        Tempah Lagi
      </button>
    </div>
  );

  return (
    <div className="h-full flex flex-col overflow-y-auto">
      <div className="px-4 py-3" style={{ background: '#0EA5E9' }}>
        <p className="font-black text-white">💇 Glamour Studio</p>
        <p className="text-xs text-white/70">Bukit Damansara · Buka 9PG - 6PTG</p>
      </div>
      <div className="p-3 space-y-3">
        {/* Services */}
        <p className="text-xs font-bold uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.5)' }}>Pilih Perkhidmatan</p>
        <div className="space-y-2">
          {services.map(s => (
            <button key={s.id} onClick={() => setSelectedService(s.id)}
              className="w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all"
              style={{ background: selectedService === s.id ? 'rgba(14,165,233,0.25)' : 'rgba(255,255,255,0.07)', border: `1px solid ${selectedService === s.id ? '#0EA5E9' : 'transparent'}` }}>
              <span className="text-xl">{s.emoji}</span>
              <div className="flex-1">
                <p className="text-sm font-semibold text-white">{s.name}</p>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>{s.duration} · {s.slots} slot tersedia</p>
              </div>
              <span className="font-black" style={{ color: '#0EA5E9' }}>RM{s.price}</span>
            </button>
          ))}
        </div>

        {selectedService !== null && (
          <>
            <p className="text-xs font-bold uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.5)' }}>Pilih Tarikh</p>
            <div className="grid grid-cols-4 gap-2">
              {dates.map((d, i) => (
                <button key={i} onClick={() => { setSelectedDate(i); setSelectedTime(null); }}
                  className="py-2 rounded-xl text-center"
                  style={{ background: selectedDate === i ? '#0EA5E9' : 'rgba(255,255,255,0.08)', color: 'white' }}>
                  <p className="text-xs" style={{ opacity: 0.7 }}>{d.label}</p>
                  <p className="text-xs font-bold">{d.date}</p>
                </button>
              ))}
            </div>
          </>
        )}

        {selectedDate !== null && (
          <>
            <p className="text-xs font-bold uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.5)' }}>Pilih Masa</p>
            <div className="grid grid-cols-3 gap-2">
              {times.map(t => {
                const booked = bookedTimes.includes(t);
                return (
                  <button key={t} onClick={() => !booked && setSelectedTime(t)} disabled={booked}
                    className="py-2 rounded-xl text-xs font-medium"
                    style={{
                      background: selectedTime === t ? '#0EA5E9' : booked ? 'rgba(239,68,68,0.15)' : 'rgba(255,255,255,0.08)',
                      color: booked ? 'rgba(239,68,68,0.5)' : 'white',
                      textDecoration: booked ? 'line-through' : 'none',
                    }}>{t}</button>
                );
              })}
            </div>
          </>
        )}

        {selectedTime && (
          <div className="space-y-2">
            {[{ key: 'nama', placeholder: 'Nama anda' }, { key: 'telefon', placeholder: 'No. WhatsApp' }].map(({ key, placeholder }) => (
              <input key={key} value={form[key]} onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))} placeholder={placeholder}
                className="w-full px-3 py-2.5 rounded-xl text-sm text-white outline-none"
                style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }} />
            ))}
            <button onClick={() => { if (form.nama && form.telefon) setConfirmed(true); }}
              disabled={!form.nama || !form.telefon}
              className="w-full py-3 rounded-xl font-bold text-sm disabled:opacity-40"
              style={{ background: '#0EA5E9', color: 'white' }}>
              Sahkan Tempahan · RM{services[selectedService]?.price}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Product Order Demo ───
function ProductDemo({ lang }) {
  const [cart, setCart] = useState({});
  const [step, setStep] = useState('shop');
  const [form, setForm] = useState({ nama: '', alamat: '', telefon: '' });
  const [done, setDone] = useState(false);

  const products = [
    { id: 0, emoji: '👕', name: 'BD Classic Tee', price: 65, sizes: ['S', 'M', 'L', 'XL'], colors: ['Hitam', 'Putih', 'Hijau'], stock: 50 },
    { id: 1, emoji: '🧥', name: 'BD Premium Hoodie', price: 120, sizes: ['M', 'L', 'XL'], colors: ['Hitam', 'Abu-abu'], stock: 20 },
    { id: 2, emoji: '🧢', name: 'BD Structured Cap', price: 45, sizes: ['Saiz Bebas'], colors: ['Hitam', 'Putih'], stock: 35 },
    { id: 3, emoji: '👜', name: 'BD Canvas Tote', price: 35, sizes: ['Saiz Standard'], colors: ['Natural', 'Hitam'], stock: 40 },
  ];

  const [selectedVariant, setSelectedVariant] = useState({});
  const totalItems = Object.values(cart).reduce((s, i) => s + i.qty, 0);
  const totalPrice = Object.values(cart).reduce((s, i) => s + i.price * i.qty, 0);

  const addToCart = (p) => {
    const size = selectedVariant[`${p.id}_size`] || p.sizes[0];
    const color = selectedVariant[`${p.id}_color`] || p.colors[0];
    const key = `${p.id}_${size}_${color}`;
    setCart(prev => ({ ...prev, [key]: prev[key] ? { ...prev[key], qty: prev[key].qty + 1 } : { ...p, size, color, qty: 1 } }));
  };

  if (done) return (
    <div className="flex flex-col items-center justify-center h-full py-8 text-center px-4">
      <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ background: 'rgba(79,70,229,0.2)' }}>
        <CheckCircle size={32} style={{ color: '#4F46E5' }} />
      </div>
      <p className="font-black text-white text-base mb-1">Pesanan Diterima!</p>
      <p className="text-sm mb-3" style={{ color: 'rgba(255,255,255,0.6)' }}>No. Pesanan: BDS-{Date.now().toString().slice(-4)}</p>
      <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>Pengesahan akan dihantar ke WhatsApp anda dalam masa 30 minit.</p>
      <button onClick={() => { setDone(false); setCart({}); setStep('shop'); }}
        className="mt-5 px-5 py-2 rounded-xl text-sm font-bold" style={{ background: '#4F46E5', color: 'white' }}>
        Beli Lagi
      </button>
    </div>
  );

  return (
    <div className="h-full flex flex-col overflow-y-auto">
      <div className="px-4 py-3 flex items-center justify-between" style={{ background: '#4F46E5' }}>
        <div>
          <p className="font-black text-white text-sm">Koleksi BD</p>
          <p className="text-xs text-white/60">Merchandise Rasmi · Penghantaran ke seluruh Malaysia</p>
        </div>
        {totalItems > 0 && <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>{totalItems} item</span>}
      </div>

      {step === 'shop' && (
        <div className="p-3 space-y-3 flex-1">
          {products.map(p => (
            <div key={p.id} className="rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.07)' }}>
              <div className="flex gap-3 mb-2">
                <span className="text-3xl">{p.emoji}</span>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <p className="text-sm font-bold text-white">{p.name}</p>
                    <p className="font-black" style={{ color: '#4F46E5' }}>RM{p.price}</p>
                  </div>
                  <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>{p.stock} unit tersedia</p>
                </div>
              </div>
              <div className="flex gap-1 flex-wrap mb-1">
                {p.sizes.map(s => <button key={s} onClick={() => setSelectedVariant(prev => ({ ...prev, [`${p.id}_size`]: s }))}
                  className="px-2 py-0.5 rounded text-xs"
                  style={{ background: selectedVariant[`${p.id}_size`] === s ? '#4F46E5' : 'rgba(255,255,255,0.1)', color: 'white' }}>{s}</button>)}
              </div>
              <div className="flex justify-between items-center">
                <div className="flex gap-1 flex-wrap">
                  {p.colors.map(c => <button key={c} onClick={() => setSelectedVariant(prev => ({ ...prev, [`${p.id}_color`]: c }))}
                    className="px-2 py-0.5 rounded text-xs"
                    style={{ background: selectedVariant[`${p.id}_color`] === c ? '#4F46E5' : 'rgba(255,255,255,0.1)', color: 'white' }}>{c}</button>)}
                </div>
                <button onClick={() => addToCart(p)} className="px-3 py-1.5 rounded-lg text-xs font-bold flex-shrink-0"
                  style={{ background: '#16C47F', color: '#05090D' }}>+ Tambah</button>
              </div>
            </div>
          ))}
          {totalItems > 0 && (
            <button onClick={() => setStep('checkout')} className="w-full py-3 rounded-xl font-black text-sm flex justify-between px-4"
              style={{ background: '#4F46E5', color: 'white' }}>
              <span>{totalItems} item dalam troli</span><span>RM{totalPrice.toFixed(2)} →</span>
            </button>
          )}
        </div>
      )}

      {step === 'checkout' && (
        <div className="p-3 space-y-3 flex-1">
          <p className="font-bold text-white text-sm">Maklumat Penghantaran</p>
          {[{ key: 'nama', ph: 'Nama penuh' }, { key: 'telefon', ph: 'No. WhatsApp' }, { key: 'alamat', ph: 'Alamat penghantaran' }].map(({ key, ph }) => (
            <input key={key} value={form[key]} onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))} placeholder={ph}
              className="w-full px-3 py-2.5 rounded-xl text-sm text-white outline-none"
              style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }} />
          ))}
          <div className="rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.08)' }}>
            {Object.values(cart).map((item, i) => (
              <div key={i} className="flex justify-between text-xs text-white py-0.5">
                <span>{item.name} ({item.size}) × {item.qty}</span><span>RM{(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))}
            <div className="flex justify-between text-sm font-black text-white pt-2 mt-1" style={{ borderTop: '1px solid rgba(255,255,255,0.15)' }}>
              <span>Jumlah + Penghantaran</span><span style={{ color: '#4F46E5' }}>RM{(totalPrice + 8).toFixed(2)}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setStep('shop')} className="px-4 py-2.5 rounded-xl text-sm" style={{ border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.6)' }}>← Kembali</button>
            <button onClick={() => { if (form.nama && form.telefon && form.alamat) setDone(true); }}
              disabled={!form.nama || !form.telefon || !form.alamat}
              className="flex-1 py-2.5 rounded-xl font-bold text-sm disabled:opacity-40"
              style={{ background: '#4F46E5', color: 'white' }}>
              Sahkan Pesanan
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── CRM Demo ───
function CRMDemo({ lang }) {
  const [activeTab, setActiveTab] = useState('pipeline');
  const leads = [
    { name: 'Ahmad Razif', biz: 'Kedai Roti Ahmad', value: 1490, stage: 'Cadangan', stageColor: '#F59E0B', days: 2 },
    { name: 'Siti Norma', biz: 'Butik Norma', value: 590, stage: 'Rundingan', stageColor: '#0EA5E9', days: 1 },
    { name: 'Lee Wei Ming', biz: 'Klinik Wei Ming', value: 890, stage: 'Baru', stageColor: '#8B5CF6', days: 0 },
    { name: 'Priya Krishna', biz: 'Restoran Priya', value: 2990, stage: 'Menang ✓', stageColor: '#16C47F', days: 5 },
  ];
  const stats = [
    { label: 'Prospek Aktif', value: '12', icon: Users, color: '#0EA5E9' },
    { label: 'Jumlah Pipeline', value: 'RM18.4K', icon: TrendingUp, color: '#16C47F' },
    { label: 'Kadar Tutup', value: '67%', icon: BarChart2, color: '#F59E0B' },
    { label: 'Bulan Ini', value: 'RM6.2K', icon: Package, color: '#8B5CF6' },
  ];
  return (
    <div className="h-full flex flex-col overflow-y-auto">
      <div className="px-4 py-3" style={{ background: '#6366F1' }}>
        <p className="font-black text-white text-sm">📊 CRM Dashboard</p>
        <p className="text-xs text-white/60">Bratstvo Sales Team · April 2026</p>
      </div>
      <div className="flex border-b" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
        {['pipeline', 'stats'].map(t => (
          <button key={t} onClick={() => setActiveTab(t)}
            className="flex-1 py-2 text-xs font-bold capitalize"
            style={{ color: activeTab === t ? '#6366F1' : 'rgba(255,255,255,0.4)', borderBottom: activeTab === t ? '2px solid #6366F1' : '2px solid transparent' }}>
            {t === 'pipeline' ? 'Saluran' : 'Statistik'}
          </button>
        ))}
      </div>
      {activeTab === 'pipeline' && (
        <div className="p-3 space-y-2 flex-1">
          {leads.map((l, i) => (
            <div key={i} className="rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.07)', borderLeft: `3px solid ${l.stageColor}` }}>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-bold text-white">{l.name}</p>
                  <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>{l.biz}</p>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: `${l.stageColor}25`, color: l.stageColor }}>{l.stage}</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="font-black text-sm" style={{ color: '#16C47F' }}>RM{l.value.toLocaleString()}</span>
                <span className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>{l.days === 0 ? 'Hari ini' : `${l.days} hari lalu`}</span>
              </div>
            </div>
          ))}
        </div>
      )}
      {activeTab === 'stats' && (
        <div className="p-3 grid grid-cols-2 gap-2 flex-1">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.07)' }}>
                <Icon size={16} style={{ color: s.color }} className="mb-2" />
                <p className="text-lg font-black text-white">{s.value}</p>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>{s.label}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

const DEMOS = {
  food: { bg: '#FF6B35', label: { en: 'Food Preorder', my: 'Pra-Pesanan Makanan' }, Component: FoodDemo },
  booking: { bg: '#0EA5E9', label: { en: 'Booking System', my: 'Sistem Tempahan' }, Component: BookingDemo },
  product: { bg: '#4F46E5', label: { en: 'Product Store', my: 'Kedai Produk' }, Component: ProductDemo },
  crm: { bg: '#6366F1', label: { en: 'CRM System', my: 'Sistem CRM' }, Component: CRMDemo },
};

export default function Demo() {
  const { lang } = useLang();
  const [activeDemo, setActiveDemo] = useState('food');

  const ActiveComponent = DEMOS[activeDemo].Component;

  return (
    <div style={{ background: 'var(--c-bg)', minHeight: '100vh' }}>
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#16C47F' }}>
              {lang === 'en' ? 'Live Demo' : 'Demo Langsung'}
            </p>
            <h1 className="text-4xl font-black mb-4" style={{ color: 'var(--c-text)' }}>
              {lang === 'en' ? 'See The Real System' : 'Cuba Sistem Sebenar'}
            </h1>
            <p className="text-base max-w-md mx-auto" style={{ color: 'var(--c-muted)' }}>
              {lang === 'en' ? 'This is exactly what your customers will experience. Fully interactive.' : 'Ini adalah sistem sebenar yang pelanggan anda akan gunakan. Cuba sekarang.'}
            </p>
          </div>

          {/* System tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {Object.entries(DEMOS).map(([id, d]) => (
              <button key={id} onClick={() => setActiveDemo(id)}
                className="px-5 py-2.5 rounded-xl text-sm font-bold transition-all"
                style={{
                  background: activeDemo === id ? d.bg : 'var(--c-surface)',
                  color: activeDemo === id ? '#fff' : 'var(--c-muted)',
                  border: `1px solid ${activeDemo === id ? d.bg : 'var(--c-border)'}`,
                }}>
                {d.label[lang]}
              </button>
            ))}
          </div>

          <div className="grid lg:grid-cols-5 gap-8 max-w-5xl mx-auto">
            {/* Phone mockup */}
            <div className="lg:col-span-2 flex justify-center">
              <div className="w-72 relative">
                {/* Phone frame */}
                <div className="rounded-[40px] overflow-hidden shadow-2xl"
                  style={{ background: '#0B1118', border: '8px solid #1a2535', height: 580 }}>
                  {/* Notch */}
                  <div className="flex justify-center pt-2 pb-1">
                    <div className="w-20 h-5 rounded-full" style={{ background: '#1a2535' }} />
                  </div>
                  {/* Screen */}
                  <div className="flex-1 overflow-hidden" style={{ height: 530, background: DEMOS[activeDemo].bg + '20' }}>
                    <ActiveComponent lang={lang} />
                  </div>
                </div>
                {/* Glow */}
                <div className="absolute inset-0 rounded-[40px] pointer-events-none opacity-20"
                  style={{ boxShadow: `0 0 60px ${DEMOS[activeDemo].bg}` }} />
              </div>
            </div>

            {/* Info panel */}
            <div className="lg:col-span-3 flex flex-col justify-center space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-4"
                  style={{ background: `${DEMOS[activeDemo].bg}20`, color: DEMOS[activeDemo].bg }}>
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: DEMOS[activeDemo].bg }} />
                  {lang === 'en' ? 'Live & Interactive' : 'Langsung & Interaktif'}
                </div>
                <h2 className="text-2xl font-black mb-3" style={{ color: 'var(--c-text)' }}>{DEMOS[activeDemo].label[lang]}</h2>
              </div>

              <div className="space-y-3">
                {[
                  { en: '✅ Click through the real ordering flow', my: '✅ Cuba aliran pesanan sebenar' },
                  { en: '✅ Select items, fill form, see confirmation', my: '✅ Pilih item, isi borang, lihat pengesahan' },
                  { en: '✅ Owner receives WhatsApp notification instantly', my: '✅ Owner terima notifikasi WhatsApp serta-merta' },
                  { en: '✅ Fully customised with your branding', my: '✅ Disesuaikan sepenuhnya dengan jenama anda' },
                ].map((item, i) => (
                  <p key={i} className="text-sm" style={{ color: 'var(--c-muted)' }}>{item[lang]}</p>
                ))}
              </div>

              <div className="rounded-2xl p-5" style={{ background: 'var(--c-surface)', border: `1px solid ${DEMOS[activeDemo].bg}30` }}>
                <p className="text-xs font-semibold mb-1" style={{ color: 'var(--c-muted)' }}>
                  {lang === 'en' ? 'Want this system for your business?' : 'Nak sistem ini untuk perniagaan anda?'}
                </p>
                <p className="text-sm mb-4" style={{ color: 'var(--c-text)' }}>
                  {lang === 'en' ? 'We build it in 24 hours. Starting from RM149.' : 'Kami bina dalam 24 jam. Bermula dari RM149.'}
                </p>
                <a href={`https://wa.me/60112345678?text=${encodeURIComponent(lang === 'en' ? `Hi! I want to build a ${DEMOS[activeDemo].label.en} for my business. Can we discuss?` : `Hai! Saya nak bina ${DEMOS[activeDemo].label.my} untuk perniagaan saya. Boleh bincang?`)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl font-bold text-sm text-center block transition-all hover:brightness-110"
                  style={{ background: '#16C47F', color: '#05090D' }}>
                  {lang === 'en' ? 'Get This System →' : 'Saya Nak Sistem Ini →'}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

//Admin.jsx
import { useState, useEffect } from 'react';
import {  } from '44Client';
import { Plus, Pencil, Trash2, X, Save, Eye, EyeOff, Star, Package, TrendingUp, ShoppingBag, Users } from 'lucide-react';

export default function Admin() {
  const [user, setUser] = useState(null);
  const [tab, setTab] = useState('overview');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editProduct, setEditProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadingImg, setUploadingImg] = useState(false);

  const emptyProduct = { name: '', name_my: '', description: '', description_my: '', price: '', category: 'T-Shirt', images: [], sizes: [], colors: [], stock: 0, active: true, featured: false, sort_order: 0 };

  useEffect(() => {
    .auth.me().then(u => setUser(u));
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    const data = await .entities.Product.list('-created_date', 100);
    setProducts(data);
    setLoading(false);
  };

  const openNew = () => { setEditProduct({ ...emptyProduct }); setShowForm(true); };
  const openEdit = (p) => { setEditProduct({ ...p }); setShowForm(true); };
  const closeForm = () => { setShowForm(false); setEditProduct(null); };

  const saveProduct = async () => {
    setSaving(true);
    const data = { ...editProduct, price: parseFloat(editProduct.price) || 0, stock: parseInt(editProduct.stock) || 0, sort_order: parseInt(editProduct.sort_order) || 0 };
    if (editProduct.id) await .entities.Product.update(editProduct.id, data);
    else await .entities.Product.create(data);
    setSaving(false);
    closeForm();
    loadProducts();
  };

  const deleteProduct = async (id) => {
    if (!confirm('Delete this product?')) return;
    await .entities.Product.delete(id);
    loadProducts();
  };

  const toggleActive = async (p) => { await .entities.Product.update(p.id, { active: !p.active }); loadProducts(); };
  const toggleFeatured = async (p) => { await .entities.Product.update(p.id, { featured: !p.featured }); loadProducts(); };

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingImg(true);
    const { file_url } = await .integrations.Core.UploadFile({ file });
    setEditProduct(prev => ({ ...prev, images: [...(prev.images || []), file_url] }));
    setUploadingImg(false);
  };

  const removeImage = (idx) => setEditProduct(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== idx) }));
  const setArr = (key, val) => { const arr = val.split(',').map(s => s.trim()).filter(Boolean); setEditProduct(prev => ({ ...prev, [key]: arr })); };

  if (!user) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--c-bg)' }}>
      <div className="w-8 h-8 border-4 border-green-900 border-t-green-400 rounded-full animate-spin" />
    </div>
  );

  if (user.role !== 'admin') return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--c-bg)' }}>
      <div className="text-center">
        <div className="text-5xl mb-4">🔒</div>
        <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--c-text)' }}>Admin Only</h2>
        <p style={{ color: 'var(--c-muted)' }}>You need admin access to view this page.</p>
      </div>
    </div>
  );

  const activeProducts = products.filter(p => p.active).length;
  const featuredProducts = products.filter(p => p.featured).length;
  const totalStock = products.reduce((s, p) => s + (p.stock || 0), 0);

  const tabs = [
    { id: 'overview', label: '📊 Overview' },
    { id: 'products', label: '📦 Products' },
    { id: 'orders', label: '🛍️ Orders' },
  ];

  return (
    <div style={{ background: 'var(--c-bg)', minHeight: '100vh' }}>
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-black" style={{ color: 'var(--c-text)' }}>Admin Dashboard</h1>
            <p className="text-sm" style={{ color: 'var(--c-muted)' }}>Selamat datang, {user.full_name}</p>
          </div>
          <span className="text-xs px-3 py-1.5 rounded-full font-bold" style={{ background: 'rgba(22,196,127,0.15)', color: '#16C47F' }}>Admin</span>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-8 p-1 rounded-xl" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className="flex-1 px-4 py-2.5 text-sm font-medium rounded-lg transition-all"
              style={{ background: tab === t.id ? '#16C47F' : 'transparent', color: tab === t.id ? '#05090D' : 'var(--c-muted)' }}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Overview */}
        {tab === 'overview' && (
          <div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { icon: Package, label: 'Total Products', value: products.length, color: '#16C47F' },
                { icon: Eye, label: 'Active', value: activeProducts, color: '#0EA5E9' },
                { icon: Star, label: 'Featured', value: featuredProducts, color: '#F59E0B' },
                { icon: ShoppingBag, label: 'Total Stock', value: totalStock, color: '#8B5CF6' },
              ].map(({ icon: Icon, label, value, color }, i) => (
                <div key={i} className="rounded-2xl p-5" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
                  <div className="flex items-center gap-2 mb-3">
                    <Icon size={16} style={{ color }} />
                    <span className="text-xs" style={{ color: 'var(--c-muted)' }}>{label}</span>
                  </div>
                  <p className="text-3xl font-black" style={{ color: 'var(--c-text)' }}>{value}</p>
                </div>
              ))}
            </div>

            <div className="rounded-2xl p-6" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp size={16} style={{ color: '#16C47F' }} />
                <h3 className="font-bold" style={{ color: 'var(--c-text)' }}>Quick Actions</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button onClick={() => { setTab('products'); openNew(); }}
                  className="flex items-center gap-3 p-4 rounded-xl text-left transition-all hover:brightness-105"
                  style={{ background: 'rgba(22,196,127,0.08)', border: '1px solid rgba(22,196,127,0.2)' }}>
                  <Plus size={18} style={{ color: '#16C47F' }} />
                  <div>
                    <p className="text-sm font-semibold" style={{ color: 'var(--c-text)' }}>Add New Product</p>
                    <p className="text-xs" style={{ color: 'var(--c-muted)' }}>Add to your merchandise shop</p>
                  </div>
                </button>
                <button onClick={() => setTab('products')}
                  className="flex items-center gap-3 p-4 rounded-xl text-left transition-all hover:brightness-105"
                  style={{ background: 'var(--c-bg)', border: '1px solid var(--c-border)' }}>
                  <Package size={18} style={{ color: 'var(--c-muted)' }} />
                  <div>
                    <p className="text-sm font-semibold" style={{ color: 'var(--c-text)' }}>Manage Products</p>
                    <p className="text-xs" style={{ color: 'var(--c-muted)' }}>Edit, toggle, delete products</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Products */}
        {tab === 'products' && (
          <div>
            <div className="flex justify-between items-center mb-5">
              <p className="text-sm" style={{ color: 'var(--c-muted)' }}>{products.length} products</p>
              <button onClick={openNew}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all hover:brightness-110"
                style={{ background: '#16C47F', color: '#05090D' }}>
                <Plus size={16} /> Add Product
              </button>
            </div>

            {loading ? (
              <div className="text-center py-20"><div className="w-8 h-8 border-4 border-green-900 border-t-green-400 rounded-full animate-spin mx-auto" /></div>
            ) : products.length === 0 ? (
              <div className="text-center py-20 rounded-2xl" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
                <p className="text-4xl mb-3">📦</p>
                <p style={{ color: 'var(--c-muted)' }}>No products yet. Add your first product!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {products.map(p => (
                  <div key={p.id} className="flex items-center gap-4 rounded-xl p-4" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
                    <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0" style={{ background: 'var(--c-bg)' }}>
                      {p.images?.[0] ? <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-2xl">🛍️</div>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-semibold text-sm" style={{ color: 'var(--c-text)' }}>{p.name}</p>
                        {p.featured && <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(22,196,127,0.1)', color: '#16C47F' }}>Featured</span>}
                        {!p.active && <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444' }}>Hidden</span>}
                      </div>
                      <p className="text-xs" style={{ color: 'var(--c-muted)' }}>{p.category} · RM{p.price} · Stock: {p.stock}</p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button onClick={() => toggleFeatured(p)} title="Toggle featured"
                        className="p-2 rounded-lg transition-all hover:bg-white/10"
                        style={{ color: p.featured ? '#16C47F' : 'var(--c-muted)' }}><Star size={16} /></button>
                      <button onClick={() => toggleActive(p)} title="Toggle visible"
                        className="p-2 rounded-lg transition-all hover:bg-white/10"
                        style={{ color: p.active ? '#16C47F' : 'var(--c-muted)' }}>
                        {p.active ? <Eye size={16} /> : <EyeOff size={16} />}
                      </button>
                      <button onClick={() => openEdit(p)} className="p-2 rounded-lg transition-all hover:bg-white/10" style={{ color: 'var(--c-muted)' }}><Pencil size={16} /></button>
                      <button onClick={() => deleteProduct(p.id)} className="p-2 rounded-lg transition-all hover:bg-white/10" style={{ color: '#ef4444' }}><Trash2 size={16} /></button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Orders - placeholder */}
        {tab === 'orders' && (
          <div className="text-center py-20 rounded-2xl" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
            <p className="text-4xl mb-3">📬</p>
            <p className="font-bold mb-2" style={{ color: 'var(--c-text)' }}>Orders come via WhatsApp</p>
            <p className="text-sm max-w-sm mx-auto" style={{ color: 'var(--c-muted)' }}>When customers checkout from your Shop, their full order details are sent directly to your WhatsApp. No order management needed here.</p>
          </div>
        )}
      </div>

      {/* Product Form Modal */}
      {showForm && editProduct && (
        <div className="fixed inset-0 z-50 flex items-start justify-end overflow-y-auto">
          <div className="absolute inset-0 bg-black/70" onClick={closeForm} />
          <div className="relative w-full max-w-lg m-4 rounded-2xl overflow-hidden" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
            <div className="flex items-center justify-between px-6 py-4 sticky top-0 z-10" style={{ background: 'var(--c-surface)', borderBottom: '1px solid var(--c-border)' }}>
              <h3 className="font-bold" style={{ color: 'var(--c-text)' }}>{editProduct.id ? 'Edit Product' : 'New Product'}</h3>
              <button onClick={closeForm} style={{ color: 'var(--c-muted)' }}><X size={20} /></button>
            </div>
            <div className="px-6 py-5 space-y-4 overflow-y-auto max-h-[80vh]">
              <div>
                <label className="text-xs font-medium mb-2 block" style={{ color: 'var(--c-muted)' }}>Product Images</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {(editProduct.images || []).map((img, i) => (
                    <div key={i} className="relative w-20 h-20 rounded-lg overflow-hidden" style={{ border: '1px solid var(--c-border)' }}>
                      <img src={img} alt="" className="w-full h-full object-cover" />
                      <button onClick={() => removeImage(i)} className="absolute top-1 right-1 w-5 h-5 rounded-full flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.7)' }}><X size={10} color="white" /></button>
                    </div>
                  ))}
                  <label className="w-20 h-20 rounded-lg flex flex-col items-center justify-center cursor-pointer transition-all hover:bg-white/10"
                    style={{ border: '1px dashed var(--c-border)', color: 'var(--c-muted)' }}>
                    {uploadingImg ? <div className="w-5 h-5 border-2 border-green-400 border-t-transparent rounded-full animate-spin" /> : <><Plus size={18} /><span className="text-xs mt-1">Upload</span></>}
                    <input type="file" accept="image/*" className="hidden" onChange={uploadImage} disabled={uploadingImg} />
                  </label>
                </div>
              </div>

              {[
                ['name', 'Product Name (English)', 'text'],
                ['name_my', 'Nama Produk (BM)', 'text'],
                ['price', 'Price (RM)', 'number'],
                ['stock', 'Stock Quantity', 'number'],
                ['sort_order', 'Sort Order', 'number'],
              ].map(([key, label, type]) => (
                <div key={key}>
                  <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--c-muted)' }}>{label}</label>
                  <input type={type} value={editProduct[key] || ''} onChange={e => setEditProduct(p => ({ ...p, [key]: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                    style={{ background: 'var(--c-input-bg)', border: '1px solid var(--c-input-border)', color: 'var(--c-text)' }} />
                </div>
              ))}

              <div>
                <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--c-muted)' }}>Category</label>
                <select value={editProduct.category} onChange={e => setEditProduct(p => ({ ...p, category: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{ background: 'var(--c-surface)', border: '1px solid var(--c-input-border)', color: 'var(--c-text)' }}>
                  {['T-Shirt', 'Hoodie', 'Hat', 'Keychain', 'Bag', 'Accessories', 'Other'].map(c => <option key={c}>{c}</option>)}
                </select>
              </div>

              {[['description', 'Description (English)'], ['description_my', 'Penerangan (BM)']].map(([key, label]) => (
                <div key={key}>
                  <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--c-muted)' }}>{label}</label>
                  <textarea value={editProduct[key] || ''} onChange={e => setEditProduct(p => ({ ...p, [key]: e.target.value }))} rows={2}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                    style={{ background: 'var(--c-input-bg)', border: '1px solid var(--c-input-border)', color: 'var(--c-text)' }} />
                </div>
              ))}

              {[['sizes', 'Sizes (e.g. S,M,L,XL)'], ['colors', 'Colors (comma separated)']].map(([key, label]) => (
                <div key={key}>
                  <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--c-muted)' }}>{label}</label>
                  <input value={(editProduct[key] || []).join(', ')} onChange={e => setArr(key, e.target.value)}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                    style={{ background: 'var(--c-input-bg)', border: '1px solid var(--c-input-border)', color: 'var(--c-text)' }} />
                </div>
              ))}

              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={editProduct.active} onChange={e => setEditProduct(p => ({ ...p, active: e.target.checked }))} />
                  <span className="text-sm" style={{ color: 'var(--c-text)' }}>Active (show in shop)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={editProduct.featured} onChange={e => setEditProduct(p => ({ ...p, featured: e.target.checked }))} />
                  <span className="text-sm" style={{ color: 'var(--c-text)' }}>Featured</span>
                </label>
              </div>
            </div>

            <div className="px-6 py-4 sticky bottom-0" style={{ background: 'var(--c-surface)', borderTop: '1px solid var(--c-border)' }}>
              <button onClick={saveProduct} disabled={saving}
                className="w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all hover:brightness-110 disabled:opacity-50"
                style={{ background: '#16C47F', color: '#05090D' }}>
                {saving ? <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" /> : <><Save size={16} /> Save Product</>}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

//ProtectedRoute.jsx
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';

const DefaultFallback = () => (
  <div className="fixed inset-0 flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
  </div>
);

export default function ProtectedRoute({ fallback = <DefaultFallback />, unauthenticatedElement }) {
  const { isAuthenticated, isLoadingAuth, authChecked, authError, checkUserAuth } = useAuth();

  useEffect(() => {
    if (!authChecked && !isLoadingAuth) {
      checkUserAuth();
    }
  }, [authChecked, isLoadingAuth, checkUserAuth]);

  if (isLoadingAuth || !authChecked) {
    return fallback;
  }

  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    }
    return unauthenticatedElement;
  }

  if (!isAuthenticated) {
    return unauthenticatedElement;
  }

  return <Outlet />;
}

//Navbar.jsx
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLang } from './LanguageContext';
import { Menu, X, Sun, Moon } from 'lucide-react';

export default function Navbar() {
  const { lang, setLang, theme, setTheme } = useLang();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  const links = [
    { label: 'Home', labelMy: 'Utama', href: '/Home' },
    { label: 'Systems', labelMy: 'Sistem', href: '/Systems' },
    { label: 'Try Demo', labelMy: 'Cuba Demo', href: '/Demo' },
    { label: 'Pricing', labelMy: 'Harga', href: '/Pricing' },
    { label: 'Shop', labelMy: 'Kedai', href: '/Shop' },
    { label: 'Dashboard', labelMy: 'Dashboard', href: '/Dashboard' },
  ];

  const isLight = theme === 'light';

  return (
    <nav
      style={{
        backgroundColor: 'var(--c-nav)',
        backdropFilter: 'blur(14px)',
        borderBottom: '1px solid var(--c-nav-border)',
      }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/Home" className="flex items-center gap-2.5">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="36" height="36" rx="10" fill="#16C47F"/>
            <text x="18" y="25" textAnchor="middle" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="16" fill="#05090D">BD</text>
          </svg>
          <div className="flex flex-col leading-none">
            <span className="font-black text-sm tracking-tight" style={{ color: 'var(--c-text)', letterSpacing: '-0.01em' }}>BRATSTVO</span>
            <span className="font-light text-xs tracking-widest" style={{ color: '#16C47F', letterSpacing: '0.15em' }}>DIGITAL</span>
          </div>
        </Link>

        {/* Center links — desktop */}
        <div className="hidden md:flex items-center gap-7">
          {links.map(l => (
            <Link key={l.href} to={l.href}
              className="text-sm transition-colors duration-200"
              style={{ color: pathname === l.href ? '#16C47F' : 'var(--c-muted)' }}
              onMouseEnter={e => { if (pathname !== l.href) e.target.style.color = 'var(--c-text)'; }}
              onMouseLeave={e => { if (pathname !== l.href) e.target.style.color = 'var(--c-muted)'; }}>
              {lang === 'en' ? l.label : l.labelMy}
            </Link>
          ))}
        </div>

        {/* Right — desktop */}
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={() => setTheme(isLight ? 'dark' : 'light')}
            className="w-8 h-8 flex items-center justify-center rounded-md transition-colors"
            style={{ color: 'var(--c-muted)', border: '1px solid var(--c-border)' }}
          >
            {isLight ? <Moon size={15} /> : <Sun size={15} />}
          </button>
          <button onClick={() => setLang(lang === 'en' ? 'my' : 'en')}
            className="text-xs px-3 py-1.5 rounded-md font-medium transition-colors"
            style={{ color: 'var(--c-muted)', border: '1px solid var(--c-border)' }}>
            {lang === 'en' ? 'MY' : 'EN'}
          </button>
          <Link to="/Setup"
            className="text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-200 hover:brightness-110"
            style={{ background: '#16C47F', color: '#05090D' }}>
            {lang === 'en' ? 'Start Setup' : 'Mula Setup'}
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden" style={{ color: 'var(--c-muted)' }} onClick={() => setOpen(!open)}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{ backgroundColor: 'var(--c-surface)', borderBottom: '1px solid var(--c-border)' }} className="md:hidden px-6 pb-4">
          {links.map(l => (
            <Link key={l.href} to={l.href} onClick={() => setOpen(false)}
              className="block py-3 text-sm border-b"
              style={{ color: pathname === l.href ? '#16C47F' : 'var(--c-muted)', borderColor: 'var(--c-border)' }}>
              {lang === 'en' ? l.label : l.labelMy}
            </Link>
          ))}
          <div className="flex items-center gap-2 pt-4">
            <button
              onClick={() => setTheme(isLight ? 'dark' : 'light')}
              className="w-8 h-8 flex items-center justify-center rounded-md"
              style={{ color: 'var(--c-muted)', border: '1px solid var(--c-border)' }}
            >
              {isLight ? <Moon size={14} /> : <Sun size={14} />}
            </button>
            <button onClick={() => setLang(lang === 'en' ? 'my' : 'en')}
              className="text-xs px-3 py-1.5 rounded-md"
              style={{ color: 'var(--c-muted)', border: '1px solid var(--c-border)' }}>
              {lang === 'en' ? 'MY' : 'EN'}
            </button>
            <Link to="/Setup" onClick={() => setOpen(false)}
              className="flex-1 text-sm font-semibold px-4 py-2 rounded-lg text-center"
              style={{ background: '#16C47F', color: '#05090D' }}>
              {lang === 'en' ? 'Start Setup' : 'Mula Setup'}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

//Footer.jsx
import { Link } from 'react-router-dom';
import { useLang } from './LanguageContext';

export default function Footer() {
  const { lang } = useLang();

  const links = [
    { en: 'Home', my: 'Utama', href: '/Home' },
    { en: 'Systems', my: 'Sistem', href: '/Systems' },
    { en: 'Try Demo', my: 'Cuba Demo', href: '/Demo' },
    { en: 'Pricing', my: 'Harga', href: '/Pricing' },
    { en: 'Shop', my: 'Kedai', href: '/Shop' },
  ];

  return (
    <footer className="py-16 px-6" style={{ background: '#05090D', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: '#16C47F' }}>
                <span className="text-xs font-black text-black">BD</span>
              </span>
              <span className="font-bold text-sm" style={{ color: '#E6EDF3' }}>
                Bratstvo <span style={{ color: '#16C47F' }}>Digital</span>
              </span>
            </div>
            <p className="text-sm mb-4" style={{ color: '#9BA6B2' }}>
              {lang === 'en' ? 'Building digital systems that work.' : 'Membina sistem digital yang berfungsi.'}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#16C47F' }}>
              {lang === 'en' ? 'Quick Links' : 'Pautan Pantas'}
            </p>
            <div className="space-y-2">
              {links.map(l => (
                <Link key={l.href} to={l.href}
                  className="block text-sm transition-colors hover:text-green-400"
                  style={{ color: '#9BA6B2' }}>
                  {lang === 'en' ? l.en : l.my}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#16C47F' }}>
              {lang === 'en' ? 'Get In Touch' : 'Hubungi Kami'}
            </p>
            <a href="https://wa.me/60" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all hover:brightness-110"
              style={{ background: '#16C47F', color: '#05090D' }}>
              💬 WhatsApp
            </a>
          </div>
        </div>

        <div className="pt-8 text-center text-xs" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', color: '#9BA6B2' }}>
          © 2026 Bratstvo Digital. {lang === 'en' ? 'All rights reserved.' : 'Hak cipta terpelihara.'}
        </div>
      </div>
    </footer>
  );
}

//Chatbot.jsx
import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2, Bot } from 'lucide-react';
import {  } from '44Client';

const SYSTEM = `You are the AI assistant for Bratstvo Digital, a Malaysian digital agency specialising in WhatsApp automation systems for SMEs (PKS). 

What we offer:
- WhatsApp Order/Booking/Preorder Systems
- CRM & Lead Management
- E-commerce Solutions
- Business Process Automation
- Professional Websites

Pricing starts from RM149 one-time setup. Monthly care plans from RM50/month. Domain add-on RM125/year.

Rules:
- Reply in the SAME language the user writes in (Malay or English)
- Be concise — max 100 words per reply
- Be friendly and professional
- Guide users to try the Demo page or contact on WhatsApp
- Never make up prices other than what is stated above`;

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([
    { role: 'assistant', text: 'Hi! 👋 Saya AI assistant Bratstvo Digital. Ada soalan tentang sistem automasi kami? / Any questions about our automation systems?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs, open]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput('');
    setMsgs(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);
    const history = msgs.map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.text}`).join('\n');
    const prompt = `${SYSTEM}\n\nConversation:\n${history}\n\nUser: ${userMsg}\n\nAssistant:`;
    const reply = await .integrations.Core.InvokeLLM({ prompt });
    setMsgs(prev => [...prev, { role: 'assistant', text: reply }]);
    setLoading(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen(o => !o)}
        className="fixed bottom-24 right-5 md:bottom-8 md:right-8 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-110 active:scale-95"
        style={{ background: '#16C47F', color: '#05090D' }}
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>

      {open && (
        <div
          className="fixed bottom-44 right-5 md:bottom-28 md:right-8 z-50 w-80 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
          style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)', height: '420px' }}
        >
          <div className="px-4 py-3 flex items-center gap-3" style={{ background: '#16C47F' }}>
            <Bot size={18} style={{ color: '#05090D' }} />
            <div>
              <div className="text-sm font-bold" style={{ color: '#05090D' }}>Bratstvo AI</div>
              <div className="text-xs" style={{ color: 'rgba(5,9,13,0.65)' }}>Online · Always here</div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className="max-w-[85%] px-3 py-2 rounded-2xl text-xs leading-relaxed"
                  style={{
                    background: m.role === 'user' ? '#16C47F' : 'var(--c-bg)',
                    color: m.role === 'user' ? '#05090D' : 'var(--c-text)',
                  }}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="px-3 py-2 rounded-2xl" style={{ background: 'var(--c-bg)' }}>
                  <Loader2 size={14} className="animate-spin" style={{ color: '#16C47F' }} />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="p-3 flex gap-2" style={{ borderTop: '1px solid var(--c-border)' }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              placeholder="Type a message..."
              className="flex-1 px-3 py-2 rounded-xl text-xs outline-none"
              style={{ background: 'var(--c-bg)', color: 'var(--c-text)', border: '1px solid var(--c-border)' }}
            />
            <button
              onClick={send}
              disabled={loading || !input.trim()}
              className="w-8 h-8 rounded-xl flex items-center justify-center transition-all hover:brightness-110 disabled:opacity-40"
              style={{ background: '#16C47F' }}
            >
              <Send size={13} style={{ color: '#05090D' }} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

//