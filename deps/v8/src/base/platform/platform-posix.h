// Copyright 2017 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

#ifndef V8_BASE_PLATFORM_PLATFORM_POSIX_H_
#define V8_BASE_PLATFORM_PLATFORM_POSIX_H_

#include "src/base/platform/platform.h"
#include "src/base/timezone-cache.h"

namespace v8 {
namespace base {

class PosixTimezoneCache : public TimezoneCache {
 public:
  const char* LocalTimezone(double time_ms) override;
  double DaylightSavingsOffset(double time_ms) override;
  double LocalTimeOffset() override;
  void Clear() override {}
  ~PosixTimezoneCache() override {}

 protected:
  static const int msPerSecond = 1000;
};

int GetProtectionFromMemoryPermission(OS::MemoryPermission access);

}  // namespace base
}  // namespace v8

#endif  // V8_BASE_PLATFORM_PLATFORM_POSIX_H_
