---
title: "Additiv Synthesis Workshop"
author: ["Philipp Neumann"]
date: 2025-04-27T18:59:00+02:00
lastmod: 2025-05-02T08:42:00+02:00
tags: ["workshop", "csound", "additiv-synthesis"]
draft: false
---

## Overview {#overview}

We want to explore different control structures in Csound through additive synthesis.
Additive synthesis provides a good opportunity for this, as its sound is prototypically composed of combined sine waves, a uniform sound source whose properties can be well formalized.

The control structures we want to examine are:

-   Logical expressions and If-Then statements
-   Ternary / Conditional operators
-   while-loops / until-loops
-   Control instruments as replacement / extension of the Score
-   Modulo operations
-   Arrays as data type


## Control Structures in Csound {#control-structures-in-csound}


### Logical Operators and If-Then Expressions {#logical-operators-and-if-then-expressions}

Logical operators check whether an expression is `true` or `1` or `false` or `0`. In most cases, two numbers are compared with each other.

Here is a list of logical expressions:

| Logical Operators | Description                      |
|-------------------|----------------------------------|
| a &lt; b          | Is a less than b?                |
| a &gt; b          | Is a greater than b?             |
| a == b            | Is a equal to b?                 |
| a != b            | Is a not equal to b?             |
| a &lt;= b         | Is a less than or equal to b?    |
| a &gt;= b         | Is a greater than or equal to b? |

With these logical operators, **if-then** expressions can now be created, which allow a specific part of the program to be executed only if the condition of the if-then expression is evaluated as `true`. An if-then expression consists of the keyword `if` followed by the condition and the keyword `then`. After that comes the arbitrarily large body of the expression. This is terminated with the keyword `endif` on a new line.

Example:

```csound
iVar1 = 3
iVar2 = 9
if (iVar1 < iVar2) then
  prints("iVar1 is less than iVar2") // this line is only executed
                                     // if the condition is true
endif
```

What happens when the condition is evaluated as `false`? In this case, the body of the if-then expression is skipped and the program is executed after the `endif`.

Logical expressions can be combined with the operators `&&` and `||`. This allows multiple conditions to be combined into a single expression that is evaluated as `true` or `1` or `false` or `0`.
With the operator `&&` (and), both conditions must be `true` for the entire expression to be `true`.
With `||` (or), one of the expressions must be `true` for the entire expression to be `true`.

Example:

```csound
iVar1 = 3
iVar2 = 9
iVar3 = 1
if ((iVar1 < iVar2) && (iVar1 > iVar3)) then
  prints("iVar1 is less than iVar2 and greater than iVar3")
endif
```

If you want to execute alternative code when a condition is evaluated as `false`, you can do this with an `else` case.

Example:

```csound
iVar1 = 3
iVar2 = 9
if (iVar1 < iVar2) then
  prints("iVar1 is less than iVar2") // this line is only executed if the condition is true
else
  prints("iVar1 is not less than iVar2") // this line is only executed if the condition is false
endif
```

We can extend this if-then statement with the help of one or more **if-else** conditions and thus check multiple cases.

Example:

```csound
iVar1 = 12
iVar2 = 9
if (iVar1 < iVar2) then
  prints("iVar1 is less than iVar2")
elseif (iVar1 > iVar2) then
  prints("iVar1 is greater than iVar2")
elseif (iVar1 == iVar2) then
  prints("iVar1 is equal to iVar2")
elseif (iVar1 != iVar2) then
  prints("iVar1 is not equal to iVar2")
else // if all conditions are false, the following line is executed
  prints("I don't know what's going on here!")
endif
```


#### Ternary Operators {#ternary-operators}

Using ternary operators or conditional operators, you can assign one of two selected values to a variable based on a logical query.

A ternary expression is structured as follows:
`variable = (logical query) ? value-1 : value-2`

If the logical query is evaluated as `true`, the variable takes the `value-1`; if the query is evaluated as `false`, the variable takes the `value-2`.

Here is an example in the Csound context:

```csound
instr 1
  iFreq = random(30, 20000)
  // iAmp is 1 if iFreq is greater than 220 and less than 440
  // If either of these conditions is not met, iAmp = 0
  iAmp = ((iFreq > 220) && (iFreq < 440)) ? 1 : 0
  aSine = poscil(iAmp, iFreq)

  // output
  out(aSine)
endin
```


### while-loops / until-loops and logical expressions {#while-loops-until-loops-and-logical-expressions}

**while**- and **until**-loops are the simplest and most straightforward form of loops in Csound. Let's start with the while-loop.
A while-loop executes its body as long as its condition is evaluated as `true` or `1`. The condition is checked at the beginning of each iteration.
The first line begins with the keyword `while`, followed by a condition, and ends with the keyword `do`.
After that follows the body of the loop, which is finally terminated with the keyword `od` on a new line.

Example:

```csound
while (condition) do
  body
od
```

To prevent the loop from executing endlessly, we need to introduce a mechanism that allows the condition of the loop to be evaluated as `false` at some point. We do this with the help of a counter variable that we increment by 1 in each iteration of the loop.

Example with a while-loop:

```csound
// the loop is executed as long as iCnt is less than iNumOfIterations
// how many times will this happen here?
iNumOfIterations = 14
iCnt init 0
while (iCnt < iNumOfIterations) do
  prints("Iteration number: %d\n", iCnt)
  iCnt += 1
od
```


### Control Instruments as Replacement / Extension of the Score {#control-instruments-as-replacement-extension-of-the-score}

Modern Csound rarely uses the Score anymore. Often, it is replaced by control instruments that handle the calling of instruments.
There are a variety of opcodes that can call an instrument. Here is a small, incomplete overview:

-   `schedule`
-   `event`
-   `event_i`
-   `schedwhen`
-   `schedkwhen`
-   `scoreline`
-   `scoreline_i`

For now, we want to use `schedule`.

Here is an example of how a control instrument uses a while-loop to call another instrument:

```csound
instr 1
  iNumOfSignals = 10
  iCnt init 0

  while (iCnt < iNumOfSignals) do
    schedule(2, 0, 1) // schedule expects the usual p-fields, as known from the Score
    iCnt += 1
  od

  turnoff // terminates the current instrument (useful for control instruments)
endin

instr 2
  out(poscil:a(0.25, 440)) // the shortest possible notation for a sound
endin
```

Here is another detailed example from the workshop:

```csound
<CsoundSynthesizer>
<CsOptions>
-d -odac -W -3
</CsOptions>
<CsInstruments>

sr = 44100
ksmps = 16
nchnls = 2
0dbfs = 1.0

instr 1 // control instrument
  iBaseFreq = 100
  iNumOfIterations = 11 ; Number of called instances of the instrument

  iCnt init 0
  while (iCnt < iNumOfIterations) do
    schedule(p4, 0, p3, iNumOfIterations, iBaseFreq, iCnt + 1) ;p6 = partial
    iCnt += 1
  od
  // after the loop is finished, stop the instrument
  turnoff
endin

instr 2 // sound generator
  // sine
  iAmp = 1 / p4
  iBaseFreq = p5
  iPartial = p6
  iFreq = iBaseFreq * iPartial
  print(iFreq)
  aSig = poscil(iAmp, iFreq)

  // envelope
  iAtt = p3 * 0.1
  iRel = iAtt
  iSusTime = p3 - (iAtt + iRel)
  aEnv = linseg(0, iAtt, 1, iSusTime, 1, iRel, 0)
  aSig *= aEnv

  // panning
  iPan = random(0, 1)
  aOut1, aOut2 pan2 aSig, iPan

  outs(aOut1, aOut2)
endin

</CsInstruments>
<CsScore>
i1 0 60 2
</CsScore>
</CsoundSynthesizer>
```


### Modulo Operations {#modulo-operations}

The modulo operation is a division between integers, where the remainder is returned.
In (the programming languages I know), the modulo operator is written as `%`.

EXAMPLE:

-   `3 % 2 = 1`, because the calculation works as follows:
-   Perform integer division: `3 / 2 = 1` (the fractional part is ignored).
-   Rewrite the equation as multiplication with remainder: `3 = 2 * 1 + REMAINDER`.
-   Since `3 - (2 * 1) = 1`, we get: `3 % 2 = 1`.

Another example:

-   `19 % 3 = 1`, because:
-   `19 / 3 = 6` (the fractional part is ignored).
-   `19 = 3 * 6 + REMAINDER`.
-   `19 - (3 * 6) = 1`.

One more example:

-   `1 % 2`
-   `1 / 2 = 0`
-   `1 = 0 * 2 + REMAINDER`
-   `1 - (0 * 2) = 1`

Modulo operations are a good tool to check if a number is **even** or **odd**. For this, a number is checked with modulo 2:
`NUMBER % 2`
If the result is 0, the number is even; if the result is 1 (commonly also != 0), the number is odd.

Combining this now, you can design the above while-loop to generate only even or odd partials.

```csound
iCnt init 0
while (iCnt < iNumOfIterations) do
  // if iCnt % 2 = 0 then iCnt is an even number and the body of the if-statement is executed
  if ((iCnt % 2) == 0) then
    schedule(p4, 0, p3, iNumOfIterations, iBaseFreq, iCnt + 1) ;p6 = partial
  endif

  iCnt += 1
od
```


### Arrays {#arrays}

An array is a special data type that allows you to store multiple values in a single variable. You can think of an array as a list or a series of numbered boxes. Each of these boxes can store a value.

Important: The boxes are numbered – starting from 0. This means: If an array has 10 places, these places are numbered from 0 to 9 (not from 1 to 10!). The number you use to access a specific box is called the index.

With this index, you can access or modify the stored values. Example:
myArray[3] returns the value in the fourth box (because counting starts at 0).

There are different forms of arrays that can store different data types. For now, we want to focus on arrays that store numbers. These numbers can be in any order in the array.

Example:

| Data  | 2 | 6 | 3 | 9 |
|-------|---|---|---|---|
| Index | 0 | 1 | 2 | 3 |

In Csound, arrays look like ordinary variables but with appended square brackets:
`iArray[]`

With the opcode `fillarray`, an array can be created and directly filled:

```csound
iMyArray[] fillarray 2, 6, 3, 9
```

If you want to read from the array, you must write the appropriate index in the square brackets:

```csound
iMyValue = iMyArray[2] // which value will be written to iMyValue here?
```

This is how you could, for example, perform additive synthesis and store the desired overtones in an array:

```csound
<CsoundSynthesizer>
<CsOptions>
-d -odac -W -3
</CsOptions>
<CsInstruments>

sr = 44100
ksmps = 16
nchnls = 2
0dbfs = 1.0

instr 1 // control instrument
  iPartials[] fillarray 25, 13, 11, 28, 17
  iBaseFreq = 100
  iNumOfIterations = lenarray(iPartials) ;; the number of iterations is
                                         ;; determined by the size of the array

  iCnt init 0
  while (iCnt < iNumOfIterations) do
    schedule(2, 0, p3, iNumOfIterations, iBaseFreq, iPartials[iCnt]) ;p6 = partial
    iCnt += 1
  od
  // after the loop is finished, stop the instrument
  turnoff
endin

instr 2 // sound generator
  // sine
  iAmp = 1 / p4
  iBaseFreq = p5
  iPartial = p6
  iFreq = iBaseFreq * iPartial
  ;; print(iFreq)
  aSig = poscil(iAmp, iFreq)

  // envelope
  iAtt = p3 * 0.1
  iRel = iAtt
  iSusTime = p3 - (iAtt + iRel)
  aEnv = linseg(0, iAtt, 1, iSusTime, 1, iRel, 0)
  aSig *= aEnv

  // panning
  iPan = random(0, 1)
  aOut1, aOut2 pan2 aSig, iPan

  outs(aOut1, aOut2)
endin

</CsInstruments>
<CsScore>
i1 0 10
</CsScore>
</CsoundSynthesizer>

```


### Appendix {#appendix}

The appendix includes 5 .csd files with examples and exercises to expand and consolidate the knowledge.

```csound
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;;; additiv synthesis with full spectrum
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
<CsoundSynthesizer>
<CsOptions>
-d -odac -W -3
</CsOptions>
<CsInstruments>

sr = 44100
ksmps = 16
nchnls = 2
0dbfs = 1.0

instr 1 // control instrument
  iBaseFreq = 100
  iNumOfIterations = 11 ; number of calles instances of an instrument

  iCnt init 0
  while (iCnt < iNumOfIterations) do
	schedule(2, 0, p3, iNumOfIterations, iBaseFreq, iCnt + 1) ;p6 = partial

	iCnt += 1
  od
  // when loop is done stop the instrument
  turnoff
endin

instr 2 // soundsource
  // sine
  iAmp = 1 / p4
  iBaseFreq = p5
  iPartial = p6
  iFreq = iBaseFreq * iPartial
  print(iFreq)
  aSig = poscil(iAmp, iFreq)

  // envelope
  iAtt = p3 * 0.1
  iRel = iAtt
  iSusTime = p3 - (iAtt + iRel)
  aEnv = linseg(0, iAtt, 1, iSusTime, 1, iRel, 0)
  aSig *= aEnv

  // panning
  iPan = random(0, 1)
  aOut1, aOut2 pan2 aSig, iPan

  outs(aOut1, aOut2)
endin

</CsInstruments>
<CsScore>
i1 0 10
</CsScore>
</CsoundSynthesizer>

```

```csound
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;;; additive synthesis with even or odd partials
;;; - modify the condition in the if-statement within the loop to generate the odd partials
;;; - there is a problem to solve here: the number of called instances is not correct.
;;; Why is that and how could we solve it? Hint: you need to manipulate the condition for the
;;; continuation of the loop.
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
<CsoundSynthesizer>
<CsOptions>
-d -odac -W -3
</CsOptions>
<CsInstruments>

sr = 44100
ksmps = 16
nchnls = 2
0dbfs = 1.0

instr 1 // control instrument
  iBaseFreq = 100
  iNumOfIterations = 11 ; number of calles instances of an instrument

  iCnt init 0
  while (iCnt < iNumOfIterations) do
    // is iCnt % 2 = 0 then iCnt is even and the body of the if-statement ist executed
	if ((iCnt % 2) == 0) then
	  schedule(p4, 0, p3, iNumOfIterations, iBaseFreq, iCnt + 1) ;p6 = partial
	endif

	iCnt += 1
  od
  // when loop is done stop the instrument
  turnoff
endin

instr 2 // soundsource
  // sine
  iAmp = 1 / p4
  iBaseFreq = p5
  iPartial = p6
  iFreq = iBaseFreq * iPartial
  ;; print(iFreq)
  aSig = poscil(iAmp, iFreq)

  // envelope
  iAtt = p3 * 0.1
  iRel = iAtt
  iSusTime = p3 - (iAtt + iRel)
  aEnv = linseg(0, iAtt, 1, iSusTime, 1, iRel, 0)
  aSig *= aEnv

  // panning
  iPan = random(0, 1)
  aOut1, aOut2 pan2 aSig, iPan

  outs(aOut1, aOut2)
endin

</CsInstruments>
<CsScore>
i1 0 10 2
</CsScore>
</CsoundSynthesizer>

```

```csound
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;;; additive synthesis with specific overtones
;;; - Task here: add a second array with partials
;;; - Extend the instrument call (schedule) and add the second array
;;; - in the sound generator instrument, use the line opcode to create a progression between
;;; the partial of the first array and the second array
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
<CsoundSynthesizer>
<CsOptions>
-d -odac -W -3
</CsOptions>
<CsInstruments>

sr = 44100
ksmps = 16
nchnls = 2
0dbfs = 1.0

instr 1 // control instrument
  iPartials[] fillarray 25, 13, 11, 28, 17
  iBaseFreq = 100
  iNumOfIterations = lenarray(iPartials) ;; the number of interations is the size of the array

  iCnt init 0
  while (iCnt < iNumOfIterations) do
	schedule(2, 0, p3, iNumOfIterations, iBaseFreq, iPartials[iCnt]) ;p6 = partial
	iCnt += 1
  od
  // when loop is done stop the instrument
  turnoff
endin

instr 2 // soundsource
  // sine
  iAmp = 1 / p4
  iBaseFreq = p5
  iPartial = p6
  iFreq = iBaseFreq * iPartial
  ;; print(iFreq)
  aSig = poscil(iAmp, iFreq)

  // envelope
  iAtt = p3 * 0.1
  iRel = iAtt
  iSusTime = p3 - (iAtt + iRel)
  aEnv = linseg(0, iAtt, 1, iSusTime, 1, iRel, 0)
  aSig *= aEnv

  // panning
  iPan = random(0, 1)
  aOut1, aOut2 pan2 aSig, iPan

  outs(aOut1, aOut2)
endin

</CsInstruments>
<CsScore>
i1 0 10
</CsScore>
</CsoundSynthesizer>

```

```csound
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;;; additive synthesis approach for filtering noise
;;; - Task here: add a second voice that gets a small offset on the frequency
;;; to create beats/beating effects
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
<CsoundSynthesizer>
<CsOptions>
-d -odac -W -3
</CsOptions>
<CsInstruments>

sr = 44100
ksmps = 16
nchnls = 2
0dbfs = 1.0

instr 1 // control instrument
  iPartials1[] fillarray 25, 13, 11, 28, 17
  iPartials2[] fillarray 27, 11, 14, 23, 12
  iBaseFreq = 100
  iNumOfIterations = lenarray(iPartials1) ;; the number of interations is the size of the array

  iCnt init 0
  while (iCnt < iNumOfIterations) do
	schedule(2, 0, p3, iBaseFreq, iPartials1[iCnt], iPartials2[iCnt])
	iCnt += 1
  od
  // when loop is done stop the instrument
  turnoff
endin

instr 2 // klangerzeuger
  // noise
  iAmp = 1
  aSig = noise(iAmp, 0)

  // filter
  iStartFreq = p4 * p5
  iEndFreq = p4 * p6
  kFreq = line(iStartFreq, p3, iEndFreq)
  kBandWidth = 1
  aSig = butterbp(aSig, kFreq, kBandWidth)

  // envelope
  iAtt = p3 * 0.1
  iRel = iAtt
  iSusTime = p3 - (iAtt + iRel)
  aEnv = linseg(0, iAtt, 1, iSusTime, 1, iRel, 0)
  aSig *= aEnv

  // panning
  iPan = random(0, 1)
  aOut1, aOut2 pan2 aSig, iPan

  outs(aOut1, aOut2)
endin

</CsInstruments>
<CsScore>
i1 0 10
</CsScore>
</CsoundSynthesizer>

```

```csound
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;;; additive synthesis approach for filtering noise
;;; - here the arrays are not read 1-to-1, but offset by 1 each time
;;; - Task: try to understand the expression associated with the variable iIndex2
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
<CsoundSynthesizer>
<CsOptions>
-d -odac -W -3
</CsOptions>
<CsInstruments>

sr = 44100
ksmps = 16
nchnls = 2
0dbfs = 1.0

instr 1 // control instrument
  iPartials1[] fillarray 25, 13, 11, 28, 17
  iPartials2[] fillarray 27, 11, 14, 23, 12
  iBaseFreq = 100
  iNumOfIterations = lenarray(iPartials1) ;; the number of interations is the size of the array

  iCnt init 0
  while (iCnt < iNumOfIterations) do
	iIndex1 = iCnt
	iIndex2 = (iCnt + 1) % lenarray(iPartials2)
	schedule(2, 0, p3, iBaseFreq, iPartials1[iIndex1], iPartials2[iIndex2])
	iCnt += 1
  od
  // when loop is done stop the instrument
  turnoff
endin

instr 2 // soundsource
  // noise
  iAmp = 1
  aSig = noise(iAmp, 0)

  // filter
  iStartFreq = p4 * p5
  iEndFreq = p4 * p6
  kFreq = line(iStartFreq, p3, iEndFreq)
  kBandWidth = 1
  aSig = butterbp(aSig, kFreq, kBandWidth)

  // envelope
  iAtt = p3 * 0.1
  iRel = iAtt
  iSusTime = p3 - (iAtt + iRel)
  aEnv = linseg(0, iAtt, 1, iSusTime, 1, iRel, 0)
  aSig *= aEnv

  // panning
  iPan = random(0, 1)
  aOut1, aOut2 pan2 aSig, iPan

  outs(aOut1, aOut2)
endin

</CsInstruments>
<CsScore>
i1 0 30
</CsScore>
</CsoundSynthesizer>

```
