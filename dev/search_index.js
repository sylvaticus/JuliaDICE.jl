var documenterSearchIndex = {"docs":
[{"location":"api.html#The-JuliaDICE-Module","page":"API","title":"The JuliaDICE Module","text":"","category":"section"},{"location":"api.html","page":"API","title":"API","text":"JuliaDICE","category":"page"},{"location":"api.html#JuliaDICE","page":"API","title":"JuliaDICE","text":"JuliaDICE\n\nImplementation of the DICE 2023 model\n\nNotes:\n\nBased on DICE2023-b-4-3-10.gms and included files (Nonco2-b-4-3-1.gms and FAIR-beta-4-3-1.gms)\nVariable casing has been harmonized that all parameters and post-optimization computation have lower cases, and all optimization variables have upper case.\n\n\n\n\n\n","category":"module"},{"location":"api.html#Module-Index","page":"API","title":"Module Index","text":"","category":"section"},{"location":"api.html","page":"API","title":"API","text":"Modules = [JuliaDICE]\nOrder   = [:constant, :type, :function, :macro]","category":"page"},{"location":"api.html#Detailed-API","page":"API","title":"Detailed API","text":"","category":"section"},{"location":"api.html","page":"API","title":"API","text":"Modules = [JuliaDICE]\nOrder   = [:constant, :type, :function, :macro]","category":"page"},{"location":"api.html#JuliaDICE.RawParameters","page":"API","title":"JuliaDICE.RawParameters","text":"RawParameters\n\nRaw (exogenous) parameters. This structure hosts the \"default\" parameters that can then be modified using keyword arguments in the run_dice(pars) function.\n\n\n\n\n\n","category":"type"},{"location":"api.html#JuliaDICE.run_dice-Tuple{}","page":"API","title":"JuliaDICE.run_dice","text":"run_dice(;optimizer=optimizer_with_attributes(Ipopt.Optimizer,\"print_level\" => 5), bounds=Dict{String,Tuple{String,String}}(),kwargs...)\n\nRun the DICE model (currently v 2023).\n\nThis function runs the DICE model and returns the results as a named tuple.\n\nParameters\n\noptimizer: The optimizer to use and eventually its options. Defaults: [optimizer_with_attributes(Ipopt.Optimizer,\"print_level\" => 5)].\nbounds: A dictionary of equality or inequality constraints. Each constraint should be specified with the variable name as the key, and a two-elements tuple as the value. The first element is either \"<=\", \">=\", or \"==\", and the second element is the right-hand side of the constraint (single value or a vector of ntimesteps length). Default: (empty dictionary). See the source code for the name of the variables of the model.\nkwargs: Keyword arguments to override the default parameter values. Again, see the model source code for the name of the parameters.\n\nOutputs\n\nA named tuple containing the following fields: solved, status, times, tidx, the post_process computed values and the optimization variables.\n\nExamples:\n\nres = run_dice()\nECO2_opt = res.ECO2\nplot(res.times[1:11] .+ 2020,ECO2_opt[1:11],ylim=(0,80), title=\"CO₂ emissions\",ylabel=\"GtCO₂/yr\",label=\"C/B optimal\", markershape=:circle, markercolor=:white)\n\nres_crazy = run_dice(optimizer=optimizer_with_attributes(Ipopt.Optimizer,\"print_level\" => 0), bounds = Dict(\"MIU\"=>(\"==\",1.0), \"TATM\"=>(\"<=\",15), \"Y\" =>(\">=\",[fill(floatmin(Float64),10);fill(0.1,71)]), \"ECO2\" =>(\"<=\",10000)), a2base = 0.01)\n\nNotes\n\nThe bounds adds constraint to the problem, but do not substitute to hard-written bounds in the model. In particular, for the upper limit of the emissions controls, use the parameter miuup instead \n\n\n\n\n\n","category":"method"},{"location":"api.html#JuliaDICE.@fields_to_vars-Tuple{Symbol, Any}","page":"API","title":"JuliaDICE.@fields_to_vars","text":"@fields_to_vars(t,x)\n\nUtility macro to convert a struct fields to local variables (for readibility, so that we can write parx instead of using everywhere p.parx).\n\n\n\n\n\n","category":"macro"},{"location":"index.html#JuliaDICE.jl","page":"Index","title":"JuliaDICE.jl","text":"","category":"section"},{"location":"index.html","page":"Index","title":"Index","text":"Documentation for JuliaDICE.jl","category":"page"}]
}
