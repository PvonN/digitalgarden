---
title: "Modulo Operation"
author: ["Philipp Neumann"]
date: 2025-03-27T08:41:00+01:00
lastmod: 2025-04-28T14:19:00+02:00
tags: ["programming", "math"]
draft: false
---

## Overview {#overview}

The **Modulo Operation** is a helpfull tool in Programming, e.g. to check if a number is even or odd. It also can be used for save indexing of arrays.

Here are some notes and examples on modulo operations.


## Content {#content}


### Modulo Basics {#modulo-basics}

The modulo operation is a division between integers that returns the remainder.
In [Programming Languages]({{< relref "20230831115529-programmiersprachen.md" >}}), the modulo operator is written as `%`.

**EXAMPLE:**
`3 % 2 = 1` because the calculation works as follows:

1.  Perform integer division: `3 / 2 = 1` (ignoring the decimal part).
2.  Rewrite the equation in terms of multiplication and remainder: `3 = 2 * 1 + REMAINDER`.
3.  Since `3 - (2 * 1) = 1` we get this: `3 % 2 = 1`.

**Another Example:**
`19 % 3 = 1` because:

1.  `19 / 3 = 6`, (ignore the decimal part).
2.  `19 = 3 * 6 + REMAINDER`
3.  `19 - (3 * 6) = 1`


### Check for even and odd numbers {#check-for-even-and-odd-numbers}

By checking if a `NUMBER % 2 = 0` you can fast check if any number is even or odd. This operation checks if `NUMBER` is evenly divisble by 2. If so `NUMBER` is even, if not `NUMBER` is odd.

Example in [C-Programming Language]({{< relref "20231210180812-c.md" >}})

```c
#include <stdio.h>

int main()
{
  int my_number = 4267;

  if ((my_number % 2) == 0)
	{
	  printf("The number %d is a even number\n", my_number);
	} else
	{
	  printf("The number %d is a odd number\n", my_number);
	}

  return 0;
}
```


## Footer {#footer}


### Links {#links}
