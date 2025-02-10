# DICEModel

Julia/JuMP port of the Nordhouse's DICE (Dynamic Integrated Climate-Economy model) model.


This package currently implements the DICE2023-b-4-3-10.gms gams version.

[![Build status (Github Actions)](https://github.com/sylvaticus/DICEModel.jl/workflows/CI/badge.svg)](https://github.com/sylvaticus/DICEModel.jl/actions)
[![codecov.io](http://codecov.io/github/sylvaticus/DICEModel.jl/coverage.svg?branch=main)](http://codecov.io/github/sylvaticus/DICEModel.jl?branch=main)
[![](https://img.shields.io/badge/docs-stable-blue.svg)](https://sylvaticus.github.io/DICEModel.jl/stable)
[![](https://img.shields.io/badge/docs-dev-blue.svg)](https://sylvaticus.github.io/DICEModel.jl/dev)


**"This program and output is not the original Barrage/Nordhaus version, which is currently only available [in GAMS](https://bit.ly/3TwJ5nO)."**


This package provides two functions:
- `run_dice_scenario(scenario_name)` [browse code] [documentation] : run one of the "official" 10 scenarios;
- `run_dice(;optimizer,bounds,kwargs...)` [browse code] [documentation] : allow to run DICE with custom solver engine (and eventually options), custom equality or inequality constraints or custom parameters.

In both cases the output is a named tuple. See `keys(result)` to find the available information and `result.VARIABLEX` to obtain the values (or just look at the source code) 



## Example

```julia
using Pkg
Pkg.activate(@__DIR__)
Pkg.add(["DICEModel","Plots"]) # run only once, then comment out
using DICEModel, Plots

# CB Optimal scenario...
res_cbopt    = run_dice_scenario("cbopt")

# Base scenario...
res_base    = run_dice_scenario("base")
# Paris "extended" scenario...
tidx = 1:81
# upper limit to emissions mitigation rate
miuup = @. min( 0.05 + 0.04*(tidx-1) - 0.01*max(0,tidx-5)  ,1.00) 
res_parisext = run_dice(miuup = miuup) # or simply: run_dice_scenario("parisext")
# Max 2 °C scenario...
res_t2c = run_dice(bounds = Dict("TATM"=>("<=",2.0))) # or simply: run_dice_scenario("t2c")

times = res_cbopt.times
# CO2 emissions plot...
plot(times[1:11],res_cbopt.ECO2[1:11],ylim=(0,70), title="CO₂ emissions",ylabel="GtCO₂/yr",label="C/B optimal", color=:blue4, markershape=:circle, markercolor=:white)
plot!(times[1:11],res_base.ECO2[1:11], label="Base", colour=:goldenrod3, markershape=:circle, markercolor=:goldenrod3)
plot!(times[1:11],res_parisext.ECO2[1:11], label="Paris ext", colour=:red, linestyle=:dash)
plot!(times[1:11],res_t2c.ECO2[1:11], label="T < 2 °C", colour=:green, markershape=:cross, markercolor=:green)

# Carbon price plot...
plot(times[1:9],res_cbopt.CPRICE[1:9],ylim=(0,300), title="Carbon price",ylabel="2019\$ / t tCO₂",label="C/B optimal", color=:blue4, markershape=:circle, markercolor=:white)
plot!(times[1:9],res_base.CPRICE[1:9], label="Base", colour=:goldenrod3, markershape=:circle, markercolor=:goldenrod3)
plot!(times[1:9],res_parisext.CPRICE[1:9], label="Paris ext", colour=:red, linestyle=:dash)
plot!(times[1:9],res_t2c.CPRICE[1:9], label="T < 2 °C", colour=:green, markershape=:cross, markercolor=:green)
```

<img src="assets/imgs/CO₂_emissions.png" width="400"/> <img src="assets/imgs/Carbon_price.png" width="400"/>


## Licence
The licence of the original GAMS code has never being specified. The Julia port itself (and only that) is MIT.

