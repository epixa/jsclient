'use strict';

export class Association {
  constructor(fn) {
    this.fn = fn;
    this.raw = null;
    this.proxied = undefined;
  }

  getter() {
    if (this.raw === null) return null;

    if (this.proxied === undefined) {
      this.proxied = this.fn(this.raw);
    }

    return this.proxied;
  }

  setter(val) {
    if (val === undefined) val = null;
    this.raw = val;
    this.proxied = null;
  }
}
